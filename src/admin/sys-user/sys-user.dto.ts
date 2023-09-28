import { PickType } from '@nestjs/mapped-types'
import { IsNumber } from 'class-validator'
import { ValidatorClassBuilder } from 'src/common/dto/util'
import { SysUser } from 'src/entity/sys-user.entity'

export class CreateSysUserDto extends ValidatorClassBuilder(
  SysUser,
  ['username'],
  ['nickname', 'email'],
) {}

export class UpdateSysUserDto extends ValidatorClassBuilder(
  SysUser,
  ['id'],
  ['username', 'nickname', 'email', 'avatar', 'status'],
) {}

export class AssignRolesDto extends PickType(SysUser, ['id']) {
  @IsNumber({}, { each: true })
  roleIds: number[]
}
