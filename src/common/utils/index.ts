export * from './crypto'
export * from './db'

export function isDemoMode() {
  return process.env.NODE_ENV === 'demo'
}
