import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUser } from 'src/entity/sys-user.entity'
import { User } from '../entity/user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SysUser]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
