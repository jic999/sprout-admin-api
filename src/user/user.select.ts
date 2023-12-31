import { SelectMapBuilder } from '@/common/utils'
import { User } from '@/entity/user.entity'

export const userSelectMap = SelectMapBuilder(User, {
  userInfo: ['id', 'username', 'email', 'nickname', 'avatar', 'gender', 'status', 'createTime', 'updateTime'],
  userInfoWithPwd: ['id', 'username', 'password', 'salt', 'email', 'nickname', 'avatar', 'gender', 'status', 'createTime', 'updateTime'],
})
