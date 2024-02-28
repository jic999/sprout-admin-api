import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { Injectable } from '@nestjs/common'
import { getFileHash } from '@/common/utils/file'

@Injectable()
export class FileService {
  public async save(file: Express.Multer.File, targetDir: string) {
    const hash = getFileHash(file.buffer)
    const filename = `${hash}.${file.originalname.split('.').pop()}`

    if (!existsSync(targetDir))
      mkdirSync(targetDir, { recursive: true })
    writeFileSync(`${targetDir}/${filename}`, file.buffer)

    return filename
  }
}
