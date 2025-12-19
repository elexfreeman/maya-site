import { getAllServices } from '~/system/services'

export default defineEventHandler(async (event) => {
  try {
    const services = await getAllServices()
    return { items: services }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to fetch services' }
  }
})

