import { findConflictingProductId, getProductById, updateProduct } from '~/system/products'
import { normalizeProductPayload } from '~/server/utils/productPayload'
import { requireAdminSession } from '~/server/utils/adminSession'

export default defineEventHandler(async (event) => {
  try {
    requireAdminSession(event)

    const idParam = getRouterParam(event, 'id')
    const id = Number(idParam)
    if (!id || Number.isNaN(id) || id < 1) {
      setResponseStatus(event, 400)
      return { error: 'Invalid id' }
    }

    const existing = await getProductById(id)
    if (!existing) {
      setResponseStatus(event, 404)
      return { error: 'Not found' }
    }

    const body = await readBody(event)
    const { payload, error } = normalizeProductPayload(body)
    if (!payload || error) {
      setResponseStatus(event, 400)
      return { error: error || 'Invalid payload' }
    }

    const conflictId = await findConflictingProductId(id, payload.uri, payload.img)
    if (conflictId) {
      setResponseStatus(event, 409)
      return { error: 'Another product already uses this uri or img', conflictId }
    }

    await updateProduct(id, payload)
    return { id, ...payload }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { error: e?.message || 'Failed to update product' }
  }
})
