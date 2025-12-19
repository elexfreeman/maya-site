import type { RowDataPacket } from 'mysql2/promise'
import { query } from './mysql'

export type ServiceRow = RowDataPacket & {
  id: number
  caption: string
  description: string
  img: string
  tags: string | null
}

export type Service = {
	id: number;
	caption: string;
	description: string;
	img: string;
	tags: string | null;
	tagsList: string[];
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

function mapRow(row: ServiceRow): Service {
  return {
    id: Number(row.id),
    caption: row.caption,
    description: row.description,
    img: row.img,
    tags: row.tags,
    tagsList: parseTags(row.tags)
  }
}

export async function getAllServices(): Promise<Service[]> {
  const rows = await query<ServiceRow[]>(
    'SELECT id, caption, description, tags, img FROM services ORDER BY id ASC'
  )
  return rows.map(mapRow)
}

export async function getServiceById(id: number): Promise<Service | null> {
  const rows = await query<ServiceRow[]>(
    'SELECT id, caption, description, tags, img FROM services WHERE id = ? LIMIT 1',
    [id]
  )
  if (!rows || rows.length === 0) return null
  return mapRow(rows[0] as ServiceRow)
}

