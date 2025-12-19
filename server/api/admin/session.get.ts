import { getAdminSession } from '~/server/utils/adminSession'

export default defineEventHandler((event) => {
  try {
    const session = getAdminSession(event)
    if (!session.authorized) {
      setResponseStatus(event, 401)
      return { authorized: false }
    }
    return { authorized: true, login: session.login, exp: session.exp }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to check session' }
  }
})
