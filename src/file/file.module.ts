import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { FileController } from './file.controller'

@Module({
  imports: [
    MulterModule.register({
      dest: '/static/dest',
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
