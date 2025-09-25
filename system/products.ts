import type { RowDataPacket } from 'mysql2/promise'
import { query } from './mysql'

export type ProductRow = RowDataPacket & {
  id: number
  caption: string
  description: string
  img: string
  tags: string | null
}

export type Product = {
  id: number
  caption: string
  description: string
  tags: string | null
  tagsList: string[]
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function parseTags(tags: string | null): string[] {
  if (!tags) return []
  const delim = process.env.TAGS_DELIM ?? ','
  const rx = new RegExp(`\n|\r|\s*${escapeRegExp(delim)}\s*`, 'g')
  return tags
    .split(rx)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

function mapRow(row: ProductRow): Product {
  return {
    id: Number(row.id),
    caption: row.caption,
    description: row.description,
    img: row.img,
    tags: row.tags,
    tagsList: parseTags(row.tags)
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await query<ProductRow[]>(
    'SELECT id, caption, description, tags, img FROM products ORDER BY id DESC'
  )
  return rows.map(mapRow)
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await query<ProductRow[]>(
    'SELECT id, caption, description, tags, img FROM products WHERE id = ? LIMIT 1',
    [id]
  )
  if (!rows || rows.length === 0) return null
  return mapRow(rows[0] as ProductRow)
}

