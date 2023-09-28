import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysPermissionService } from './sys-permission.service'
import { SysPermission } from '@/entity/sys-permission.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SysPermission]),
  ],
  providers: [SysPermissionService],
  exports: [SysPermissionService],
})
export class SysPermissionModule {}
