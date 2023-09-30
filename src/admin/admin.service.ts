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
    const sysPerm: CreateSysPermissionDto = { code: 'sys', name: '系统管理' }
    const _sysPerm = await this.perm.create(sysPerm)
    const sysPermChildren: CreateSysPermissionDto[] = [
      { parentId: _sysPerm.id, code: 'sys:user', name: '用户管理' },
      { parentId: _sysPerm.id, code: 'sys:role', name: '角色管理' },
      { parentId: _sysPerm.id, code: 'sys:perm', name: '权限管理' },
    ]
    const _sysPermChildren = await this.perm.batchCreate(sysPermChildren)
    const perms: CreateSysPermissionDto[] = [
      // user
      { parentId: _sysPermChildren[0].id, name: '新增用户', code: 'sys:user:create' },
      { parentId: _sysPermChildren[0].id, name: '修改用户', code: 'sys:user:update' },
      { parentId: _sysPermChildren[0].id, name: '删除用户', code: 'sys:user:delete' },
      { parentId: _sysPermChildren[0].id, name: '查询用户', code: 'sys:user:read' },
      { parentId: _sysPermChildren[0].id, name: '分配角色', code: 'sys:user:assignRoles' },
      // role
      { parentId: _sysPermChildren[1].id, name: '新增角色', code: 'sys:role:create' },
      { parentId: _sysPermChildren[1].id, name: '修改角色', code: 'sys:role:update' },
      { parentId: _sysPermChildren[1].id, name: '删除角色', code: 'sys:role:delete' },
      { parentId: _sysPermChildren[1].id, name: '查询角色', code: 'sys:role:read' },
      { parentId: _sysPermChildren[1].id, name: '分配权限', code: 'sys:role:assignPerms' },
      // perm
      { parentId: _sysPermChildren[2].id, name: '新增权限', code: 'sys:perm:create' },
      { parentId: _sysPermChildren[2].id, name: '修改权限', code: 'sys:perm:update' },
      { parentId: _sysPermChildren[2].id, name: '删除权限', code: 'sys:perm:delete' },
      { parentId: _sysPermChildren[2].id, name: '查询权限', code: 'sys:perm:read' },
    ]
    const _perms = await this.perm.batchCreate(perms)

    const roles: CreateSysRoleDto[] = [
      { name: '超级管理员', code: 'admin', permIds: _perms.map(p => p.id) },
      { name: '普通用户', code: 'user', permIds: _perms.filter(p => p.code.endsWith('read')).map(p => p.id) },
    ]
    const _roles = await Promise.all(roles.map(r => this.role.create(r)))

    const users = await Promise.all([
      this.user.create({ username: 'admin', nickname: '管理员' }),
      this.user.create({ username: 'jic999', nickname: 'jic999' }),
    ])
    await Promise.all(users.map((u, i) => this.user.assignRoles({ id: u.id, roleIds: [_roles[i].id] })))
  }
}
