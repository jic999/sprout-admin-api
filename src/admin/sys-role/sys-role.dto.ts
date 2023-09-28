import { IsNumber, IsOptional } from 'class-validator'
import { PickType } from '@nestjs/mapped-types'
import { ValidatorClassBuilder } from '@/common/dto'
import { SysRole } from '@/entity/sys-role.entity'

export class CreateSysRoleDto extends ValidatorClassBuilder(
  SysRole,
  ['name'],
  ['desc'],
) {
  @IsNumber({}, { each: true })
  @IsOptional()
  permIds?: number[]
}

export class UpdateSysRoleDto extends ValidatorClassBuilder(
  SysRole,
  ['id'],
  ['name', 'desc'],
) {}
export class SysRoleIdDto extends PickType(SysRole, ['id']) {}

export class AssignPermsDto extends ValidatorClassBuilder(
  SysRole,
  ['id'],
  [],
) {
  @IsNumber({}, { each: true })
  permIds: number[]
}
