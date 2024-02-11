import { createHash } from 'node:crypto'
import type { Buffer } from 'node:buffer'

export function getFileHash(buffer: Buffer, algorithm = 'sha256'): string {
  const hash = createHash(algorithm)
  hash.update(buffer)
  return hash.digest('hex')
}
