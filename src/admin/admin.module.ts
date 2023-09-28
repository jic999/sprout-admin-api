import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PermissionGuard } from '@common/guards'
import { SysUserModule } from './sys-user/sys-user.module'
import { SysRoleModule } from './sys-role/sys-role.module'
import { SysPermissionModule } from './sys-permission/sys-permission.module'
import { AdminBaseModule } from './base/base.module'
import { SysUserController } from './sys-user/sys-user.controller'
import { SysRoleController } from './sys-role/sys-role.controller'
import { SysPermissionController } from './sys-permission/sys-permission.controller'
import { AdminBaseController } from './base/base.controller'
import { AdminService } from './admin.service'
import { UserModule } from '@/user'

@Module({
  imports: [
    AdminBaseModule,
    SysUserModule,
    SysRoleModule,
    SysPermissionModule,
    UserModule,
  ],
  // register controllers uniformly, friendly to guards
  controllers: [
    AdminBaseController,
    SysUserController,
    SysRoleController,
    SysPermissionController,
  ],
  providers: [
    AdminService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
