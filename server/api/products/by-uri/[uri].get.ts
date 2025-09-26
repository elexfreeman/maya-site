import { getProductByUri } from '~/system/products'

export default defineEventHandler(async (event) => {
  try {
    const uri = getRouterParam(event, 'uri')
    if (!uri || typeof uri !== 'string') {
      setResponseStatus(event, 400)
      return { error: 'Invalid uri' }
    }
    const product = await getProductByUri(uri)
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

