import type { RowDataPacket } from 'mysql2/promise'
import { query } from './mysql'

export type ProductRow = RowDataPacket & {
  id: number
  caption: string
  description: string
  img: string
  tags: string | null
  uri: string
}

export type Product = {
	id: number;
	caption: string;
	description: string;
	img: string;
	tags: string | null;
	tagsList: string[];
  uri: string;
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
    tagsList: parseTags(row.tags),
    uri: row.uri
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await query<ProductRow[]>(
    'SELECT id, caption, description, tags, img, uri FROM products ORDER BY id DESC'
  )
  return rows.map(mapRow)
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await query<ProductRow[]>(
    'SELECT id, caption, description, tags, img, uri FROM products WHERE id = ? LIMIT 1',
    [id]
  )
  if (!rows || rows.length === 0) return null
  return mapRow(rows[0] as ProductRow)
}

export async function getProductByUri(uri: string): Promise<Product | null> {
  const rows = await query<ProductRow[]>(
    'SELECT id, caption, description, tags, img, uri FROM products WHERE uri = ? LIMIT 1',
    [uri]
  )
  if (!rows || rows.length === 0) return null
  return mapRow(rows[0] as ProductRow)
}

export type NewProduct = {
  caption: string
  description: string
  tags: string | null
  img: string
  uri: string
}

export type ProductPayload = {
  caption: string
  description: string
  tags: string | null
  img: string
  uri: string
}

export async function findProductIdByUriOrImg(uri: string, img: string): Promise<number | null> {
  const rows = await query<RowDataPacket[]>(
    'SELECT id FROM products WHERE uri = ? OR img = ? LIMIT 1',
    [uri, img]
  )
  if (!rows || rows.length === 0) return null
  // @ts-ignore
  return Number(rows[0].id)
}

export async function findProductIdByUriOnly(uri: string): Promise<number | null> {
  const rows = await query<RowDataPacket[]>(
    'SELECT id FROM products WHERE uri = ? LIMIT 1',
    [uri]
  )
  if (!rows || rows.length === 0) return null
  // @ts-ignore
  return Number(rows[0].id)
}

export async function findProductIdByImgOnly(img: string): Promise<number | null> {
  const rows = await query<RowDataPacket[]>(
    'SELECT id FROM products WHERE img = ? LIMIT 1',
    [img]
  )
  if (!rows || rows.length === 0) return null
  // @ts-ignore
  return Number(rows[0].id)
}

export async function insertProduct(p: NewProduct): Promise<number> {
  const rows = await query<any>(
    'INSERT INTO products (caption, description, tags, img, uri) VALUES (?, ?, ?, ?, ?)',
    [p.caption, p.description, p.tags, p.img, p.uri]
  )
  // mysql2 returns OkPacket with insertId
  return Number((rows as any).insertId || 0)
}

export async function findConflictingProductId(id: number, uri: string, img: string): Promise<number | null> {
  const rows = await query<RowDataPacket[]>(
    'SELECT id FROM products WHERE (uri = ? OR img = ?) AND id != ? LIMIT 1',
    [uri, img, id]
  )
  if (!rows || rows.length === 0) return null
  // @ts-ignore
  return Number(rows[0].id)
}

export async function updateProduct(id: number, p: ProductPayload): Promise<void> {
  await query(
    'UPDATE products SET caption = ?, description = ?, tags = ?, img = ?, uri = ? WHERE id = ?',
    [p.caption, p.description, p.tags, p.img, p.uri, id]
  )
}
