import { Injectable, Logger } from '@nestjs/common'
import { SysUserService } from './sys-user/sys-user.service'
import { SysRoleService } from './sys-role/sys-role.service'
import { SysPermissionService } from './sys-permission/sys-permission.service'
import { CreateSysPermissionDto } from './sys-permission/sys-permission.dto'
import { CreateSysRoleDto } from './sys-role/sys-role.dto'

@Injectable()
export class AdminService {
  constructor(
    private user: SysUserService,
    private role: SysRoleService,
    private perm: SysPermissionService,
  ) {}

  async initAdmin() {
    const count = await this.user.getCount()
    Logger.log(`Admin user count: ${count}`)
    if (count)
      return
    const perms: CreateSysPermissionDto[] = [
      { name: 'sys:user:create', desc: '新增用户' },
      { name: 'sys:user:update', desc: '修改用户' },
      { name: 'sys:user:delete', desc: '删除用户' },
      { name: 'sys:user:read', desc: '查询用户' },
      { name: 'sys:user:assignRoles', desc: '分配角色' },
      { name: 'sys:role:create', desc: '新增角色' },
      { name: 'sys:role:update', desc: '修改角色' },
      { name: 'sys:role:delete', desc: '删除角色' },
      { name: 'sys:role:read', desc: '查询角色' },
      { name: 'sys:role:assignPerms', desc: '分配权限' },
      { name: 'sys:perm:create', desc: '新增权限' },
      { name: 'sys:perm:update', desc: '修改权限' },
      { name: 'sys:perm:delete', desc: '删除权限' },
      { name: 'sys:perm:read', desc: '查询权限' },
    ]
    const _perms = await this.perm.batchCreate(perms)

    const roles: CreateSysRoleDto[] = [
      { name: 'admin', desc: '超级管理员', permIds: _perms.map(p => p.id) },
      { name: 'user', desc: '普通用户', permIds: _perms.filter(p => p.name.endsWith('read')).map(p => p.id) },
    ]
    const _roles = await Promise.all(roles.map(r => this.role.create(r)))

    const users = await Promise.all([
      this.user.create({ username: 'admin', nickname: '管理员' }),
      this.user.create({ username: 'jic999', nickname: 'jic999' }),
    ])
    await Promise.all(
      users.map((u, i) => this.user.assignRoles({ id: u.id, roleIds: [_roles[i].id] })),
    )
  }
}
