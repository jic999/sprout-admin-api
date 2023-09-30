import { SysPermission } from '@/entity'

export class SysPermTree extends SysPermission {
  children?: SysPermTree[]
}
