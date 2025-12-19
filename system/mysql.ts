import type { Pool, PoolOptions, RowDataPacket } from 'mysql2/promise'
import mysql from 'mysql2/promise'

type MysqlConfig = {
  uri?: string
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
  connectionLimit?: number
  ssl?: boolean | 'Amazon RDS' | Record<string, unknown>
}

let pool: Pool | null = null

function readConfig(): MysqlConfig {
  const cfgFromEnv: MysqlConfig = {
    uri: process.env.MYSQL_URI,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : undefined,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB || process.env.MYSQL_DATABASE,
    connectionLimit: process.env.MYSQL_POOL_LIMIT ? Number(process.env.MYSQL_POOL_LIMIT) : 10,
    ssl: process.env.MYSQL_SSL === 'true' ? true : undefined
  }
  return cfgFromEnv
}

function createPool(): Pool {
  const cfg = readConfig()
  if (cfg.uri) {
    return mysql.createPool({ uri: cfg.uri, waitForConnections: true, connectionLimit: cfg.connectionLimit || 10 })
  }

  if (!cfg.host || !cfg.user || !cfg.database) {
    throw new Error('MySQL config is incomplete. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB')
  }

  const options: PoolOptions = {
    host: cfg.host,
    port: cfg.port || 3306,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    waitForConnections: true,
    connectionLimit: cfg.connectionLimit || 10,
    ssl: cfg.ssl
  }
  return mysql.createPool(options)
}

export function getPool(): Pool {
  if (!pool) pool = createPool()
  return pool
}

export async function query<T = RowDataPacket[] | any[]>(sql: string, params?: any[]): Promise<T> {
  const p = getPool()
  const [rows] = await p.execute(sql, params)
  return rows as T
}

export async function ping(): Promise<boolean> {
  const rows = await query<RowDataPacket[]>(`SELECT 1 AS ok`)
  // @ts-ignore
  return Array.isArray(rows) && rows.length > 0 && (rows[0] as any).ok === 1
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}

