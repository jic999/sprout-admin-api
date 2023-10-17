import { PickType } from '@nestjs/mapped-types'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ValidatorClassBuilder } from '@common/dto'
import { SysUser } from '@entity'
import { PageOptionsDto } from '@/common/dto'

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

export class SysUserPageDto extends PageOptionsDto {
  @IsString({ message: '用户名必须是字符串' })
  @IsOptional()
  username?: string

  @IsString({ message: '昵称必须是字符串' })
  @IsOptional()
  nickname?: string
}

export class UserIdsDto {
  @IsString({ each: true })
  ids: string[]
}
