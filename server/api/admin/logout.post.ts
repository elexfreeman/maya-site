import { clearAdminSessionCookie } from '~/server/utils/adminSession'

export default defineEventHandler((event) => {
  try {
    clearAdminSessionCookie(event)
    return { ok: true }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to logout' }
  }
})
