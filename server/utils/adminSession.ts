import crypto from 'node:crypto'
import type { H3Event } from 'h3'
import { createError } from 'h3'

const COOKIE_NAME = 'admin_session'
const DEFAULT_TTL_SECONDS = 60 * 60 * 8 // 8h

type AdminCreds = { login: string; password: string }

function getEnvCreds(): AdminCreds | null {
  const login = process.env.ADMIN_LOGIN || process.env.ADMIN_USER
  const password = process.env.ADMIN_PASSWORD
  if (!login || !password) return null
  return { login, password }
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'change-me'
}

function getTtl(): number {
  const raw = process.env.ADMIN_SESSION_TTL_SECONDS
  const parsed = raw ? Number(raw) : DEFAULT_TTL_SECONDS
  if (!parsed || Number.isNaN(parsed) || parsed < 60) return DEFAULT_TTL_SECONDS
  return parsed
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function validateAdminCredentials(login: string, password: string): { ok: boolean; error?: string } {
  const creds = getEnvCreds()
  if (!creds) return { ok: false, error: 'Admin credentials are not configured in environment' }
  if (creds.login !== login || creds.password !== password) return { ok: false, error: 'Invalid login or password' }
  return { ok: true }
}

export function createSessionToken(login: string): string {
  const expMs = Date.now() + getTtl() * 1000
  const payload = `${login}|${expMs}`
  const sig = sign(payload)
  return `${payload}|${sig}`
}

export function parseSessionToken(token: string | undefined | null): { login: string; exp: number } | null {
  if (!token) return null
  const parts = token.split('|')
  if (parts.length !== 3) return null
  const [login, expStr, sig] = parts
  const exp = Number(expStr)
  if (!login || !exp || Number.isNaN(exp)) return null
  const payload = `${login}|${exp}`
  const expectedSig = sign(payload)
  if (sig.length !== expectedSig.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null
  if (Date.now() > exp) return null
  return { login, exp }
}

export function setAdminSessionCookie(event: H3Event, login: string) {
  const token = createSessionToken(login)
  const maxAge = getTtl()
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge,
    secure: process.env.NODE_ENV === 'production'
  })
}

export function clearAdminSessionCookie(event: H3Event) {
  setCookie(event, COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production'
  })
}

export function getAdminSession(event: H3Event): { authorized: boolean; login?: string; exp?: number } {
  const raw = getCookie(event, COOKIE_NAME)
  const parsed = parseSessionToken(raw)
  if (!parsed) return { authorized: false }
  return { authorized: true, login: parsed.login, exp: parsed.exp }
}

export function requireAdminSession(event: H3Event) {
  const session = getAdminSession(event)
  if (!session.authorized) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
