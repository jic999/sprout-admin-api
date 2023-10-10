import { PickType } from '@nestjs/mapped-types'
import { IsString, Length } from 'class-validator'
import { BaseUser } from 'src/entity/base/user-base.entity'
import { ValidatorClassBuilder } from './util'
import { SysUser } from '@/entity'

export class RegisterDto extends PickType(BaseUser, ['username', 'password']) {}

export class LoginDto extends PickType(BaseUser, ['username', 'password']) {
  @IsString()
  @Length(4, 4)
  checkCode: string
}

export class UserIdDto extends PickType(BaseUser, ['id']) {}

export class EditSysUserInfoDto extends ValidatorClassBuilder(
  SysUser,
  [],
  ['id', 'nickname', 'avatar'],
) {}
