import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Controller, Logger, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { getFileHash } from '@common/utils/file'

@Controller('file')
export class FileController {
  constructor() {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024, message: '上传头像大小不可超过1MB' })
        .addFileTypeValidator({ fileType: /png|jpe?g/ })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const hash = await getFileHash(file.path)
    const filename = `${hash}.${file.originalname.split('.').pop()}`
    const targetDir = 'public/images/avatar'
    const fullPath = join(targetDir, filename)
    if (existsSync(fullPath)) {
      Logger.log('avatar => File already exists', 'FileController')
      return filename
    }
    if (!existsSync(targetDir))
      mkdirSync(targetDir, { recursive: true })

    writeFileSync(`${targetDir}/${filename}`, readFileSync(file.path))
    return filename
  }
}
