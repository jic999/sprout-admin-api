import { ValidatorClassBuilder } from '@common/dto'
import { SysPermission } from '@/entity/sys-permission.entity'

export class CreateSysPermissionDto extends ValidatorClassBuilder(
  SysPermission,
  ['name'],
  ['desc'],
) {}

export class UpdateSysPermissionDto extends ValidatorClassBuilder(
  SysPermission,
  ['id'],
  ['name', 'desc'],
) {}

export class SysPermissionIdDto extends ValidatorClassBuilder(
  SysPermission,
  ['id'],
  [],
) {}
