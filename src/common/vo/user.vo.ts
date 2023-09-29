import { ValidatorClassBuilder } from '../dto'
import { BaseUser } from '@/entity/base/user-base.entity'

export class UserInfoVo extends ValidatorClassBuilder(
  BaseUser,
  ['id', 'username', 'nickname', 'avatar', 'email'],
  [],
) {
  roles: string[]

  perms: string[]
}
