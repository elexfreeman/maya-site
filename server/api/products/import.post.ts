import path from 'node:path'
import fs from 'node:fs/promises'
import { findProductIdByImgOnly, findProductIdByUriOnly, insertProduct } from '~/system/products'

function normalizeTag(name: string): string {
  return name.trim().replace(/[_-]+/g, ' ')
}

function titleFromFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, '')
  return base
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Basic Russian -> Latin transliteration plus generic slugify
function slugify(input: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
    х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
  }
  const lower = input.toLowerCase()
  const translit = lower
    .split('')
    .map((ch) => (map[ch] !== undefined ? map[ch] : ch))
    .join('')
  return translit
    .normalize('NFKD')
    // remove diacritics
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else if (entry.isFile()) {
      yield full
    }
  }
}

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

export default defineEventHandler(async (event) => {
  const baseDir = path.join(process.cwd(), 'public', 'products')
  const results: { inserted: number; skipped: number; items: any[] } = { inserted: 0, skipped: 0, items: [] }
  try {
    // ensure directory exists
    await fs.access(baseDir)
  } catch {
    setResponseStatus(event, 404)
    return { error: 'public/products not found' }
  }

  const delim = process.env.TAGS_DELIM ?? ','

  for await (const fullPath of walk(baseDir)) {
    const ext = path.extname(fullPath).toLowerCase()
    if (!IMAGE_EXT.has(ext)) continue

    const relFromPublic = path.relative(path.join(process.cwd(), 'public'), fullPath)
    const webPath = '/' + relFromPublic.split(path.sep).join('/') // '/products/...'

    // Derive tags from subfolders under products
    const relFromProducts = path.relative(baseDir, fullPath)
    const segments = relFromProducts.split(path.sep)
    const fileName = segments.pop() || ''
    const tagSegments = segments.map(normalizeTag).filter(Boolean)
    const tags = tagSegments.join(`${delim} `) || null

    // Caption from filename; URI from folders + filename
    const caption = titleFromFilename(fileName)
    const uriBase = slugify([...tagSegments, titleFromFilename(fileName)].filter(Boolean).join('-'))
    let uri = uriBase || slugify(fileName) || slugify(webPath)

    // Skip if image already present
    const existsByImg = await findProductIdByImgOnly(webPath)
    if (existsByImg) {
      results.skipped++
      results.items.push({ action: 'skip', reason: 'exists_by_img', uri, img: webPath, id: existsByImg })
      continue
    }

    // Ensure URI uniqueness: if taken, append incremental suffix
    let suffix = 1
    let candidate = uri
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const existsByUri = await findProductIdByUriOnly(candidate)
      if (!existsByUri) {
        uri = candidate
        break
      }
      suffix += 1
      candidate = `${uriBase}-${suffix}`
    }

    const description = ''
    const id = await insertProduct({ caption, description, tags, img: webPath, uri })
    results.inserted++
    results.items.push({ action: 'insert', id, uri, img: webPath, tags, caption })
  }

  return results
})
