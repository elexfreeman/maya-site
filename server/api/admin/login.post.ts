import { clearAdminSessionCookie, setAdminSessionCookie, validateAdminCredentials } from '~/server/utils/adminSession'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const login = typeof body?.login === 'string' ? body.login.trim() : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!login || !password) {
      setResponseStatus(event, 400)
      return { error: 'Login and password are required' }
    }

    const validation = validateAdminCredentials(login, password)
    if (!validation.ok) {
      clearAdminSessionCookie(event)
      setResponseStatus(event, 401)
      return { error: validation.error || 'Invalid credentials' }
    }

    setAdminSessionCookie(event, login)
    return { ok: true, login }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to login' }
  }
})
