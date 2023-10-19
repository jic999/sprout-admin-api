import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { FileController } from './file.controller'

@Module({
  imports: [
    MulterModule.register({
      dest: '/public/dest',
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
