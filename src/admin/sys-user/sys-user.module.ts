import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUser } from 'src/entity/sys-user.entity'
import { SysUserService } from './sys-user.service'
import { SysRole } from '@/entity/sys-role.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SysUser, SysRole]),
  ],
  providers: [SysUserService],
  exports: [SysUserService],
})
export class SysUserModule {}
