export default defineNuxtRouteMiddleware(async (to) => {
  const headers = process.client ? undefined : useRequestHeaders(['cookie'])
  try {
    await $fetch('/api/admin/session', { headers })
  } catch (e: any) {
    const redirect = encodeURIComponent(to.fullPath)
    return navigateTo(`/admin-login?redirect=${redirect}`)
  }
})
