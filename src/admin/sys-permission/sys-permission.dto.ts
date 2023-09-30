import { ValidatorClassBuilder } from '@common/dto'
import { SysPermission } from '@/entity/sys-permission.entity'

export class CreateSysPermissionDto extends ValidatorClassBuilder(
  SysPermission,
  ['name', 'code'],
  ['parentId', 'desc'],
) {}

export class UpdateSysPermissionDto extends ValidatorClassBuilder(
  SysPermission,
  ['id'],
  ['parentId', 'name', 'code', 'desc'],
) {}

export class SysPermissionIdDto extends ValidatorClassBuilder(
  SysPermission,
  ['id'],
  [],
) {}
