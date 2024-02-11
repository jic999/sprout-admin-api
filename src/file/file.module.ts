import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { FileReference } from '@/entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([FileReference]),
    MulterModule.register(),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
