import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'

export function getFileHash(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = createReadStream(path)

    stream.on('data', (chunk) => {
      hash.update(chunk)
    })

    stream.on('end', () => {
      const fileHash = hash.digest('hex')
      resolve(fileHash)
    })

    stream.on('error', (error) => {
      reject(error)
    })
  })
}
