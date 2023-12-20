import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FileReference } from '@/entity'
import { getFileHash } from '@/common/utils/file'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileReference)
    private fileReference: Repository<FileReference>,
  ) {}

  public isExist(id: string): Promise<boolean> {
    return this.fileReference.exist({ where: { id } })
  }

  public async save(file: Express.Multer.File, targetDir: string) {
    const hash = await getFileHash(file.path)
    const reference = await this.fileReference.findOneBy({ id: hash })
    const filename = `${hash}.${file.originalname.split('.').pop()}`

    if (reference) {
      reference.count++
      await this.fileReference.save(reference)
      return filename
    }

    if (!existsSync(targetDir))
      mkdirSync(targetDir, { recursive: true })
    writeFileSync(`${targetDir}/${filename}`, readFileSync(file.path))

    const newReference = this.fileReference.create({ id: hash, count: 1 })
    await this.fileReference.save(newReference)
    return filename
  }
}
