import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysRoleService } from './sys-role.service'
import { SysRole } from '@/entity/sys-role.entity'
import { SysPermission } from '@/entity/sys-permission.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SysRole, SysPermission]),
  ],
  providers: [SysRoleService],
  exports: [SysRoleService],
})
export class SysRoleModule {}
