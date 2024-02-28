import { Controller, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService,
  ) {}

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
    const targetDir = 'public/upload'
    const filename = await this.fileService.save(file, targetDir)
    return filename
  }
}
