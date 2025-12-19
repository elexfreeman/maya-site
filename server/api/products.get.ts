import { getAllProducts } from '~/system/products'

export default defineEventHandler(async (event) => {
  try {
    const products = await getAllProducts()
    return { items: products }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to fetch products' }
  }
})

