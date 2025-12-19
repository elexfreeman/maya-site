import type { ProductPayload } from '~/system/products'

function asTrimmedString(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

export function normalizeProductPayload(raw: any): { payload?: ProductPayload; error?: string } {
  const caption = asTrimmedString(raw?.caption)
  const description = asTrimmedString(raw?.description)
  const img = asTrimmedString(raw?.img)
  const uri = asTrimmedString(raw?.uri)

  if (!caption) return { error: 'caption is required' }
  if (!description) return { error: 'description is required' }
  if (!img) return { error: 'img is required' }
  if (!uri || /\s/.test(uri)) return { error: 'uri is required and must not contain spaces' }

  const tagsRaw = raw?.tags
  const tagsStr = tagsRaw === undefined || tagsRaw === null ? '' : asTrimmedString(tagsRaw)
  const tags = tagsStr.length > 0 ? tagsStr : null

  return {
    payload: {
      caption,
      description,
      img,
      uri,
      tags
    }
  }
}
