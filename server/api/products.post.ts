import { findProductIdByUriOrImg, insertProduct } from '~/system/products'
import { normalizeProductPayload } from '~/server/utils/productPayload'
import { requireAdminSession } from '~/server/utils/adminSession'

export default defineEventHandler(async (event) => {
  try {
    requireAdminSession(event)

    const body = await readBody(event)
    const { payload, error } = normalizeProductPayload(body)
    if (!payload || error) {
      setResponseStatus(event, 400)
      return { error: error || 'Invalid payload' }
    }

    const exists = await findProductIdByUriOrImg(payload.uri, payload.img)
    if (exists) {
      setResponseStatus(event, 409)
      return { error: 'Product with the same uri or img already exists', conflictId: exists }
    }

    const id = await insertProduct(payload)
    return { id }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to create product' }
  }
})
