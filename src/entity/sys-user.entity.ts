import { Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseUser } from './base/user-base.entity'
import { SysRole } from './sys-role.entity'

@Entity({ name: 'sys_user' })
export class SysUser extends BaseUser {
  @ManyToMany(() => SysRole)
  @JoinTable({ name: 'sys_user_role' })
  roles: SysRole[]
}
