import { getProductById } from '~/system/products'

export default defineEventHandler(async (event) => {
  try {
    const idParam = getRouterParam(event, 'id')
    const id = Number(idParam)
    if (!id || Number.isNaN(id) || id < 1) {
      setResponseStatus(event, 400)
      return { error: 'Invalid id' }
    }
    const product = await getProductById(id)
    if (!product) {
      setResponseStatus(event, 404)
      return { error: 'Not found' }
    }
    return product
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to fetch product' }
  }
})

