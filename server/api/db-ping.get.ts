export default defineEventHandler(async (event) => {
  try {
    const { ping } = await import('~/system/mysql')
    const ok = await ping()
    return { ok }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { ok: false, error: e?.message || 'DB ping failed' }
  }
})

