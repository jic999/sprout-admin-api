import * as _ from 'lodash'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegisterDto } from 'src/common/dto/user.dto'
import { SysUser } from 'src/entity/sys-user.entity'
import { User } from 'src/entity/user.entity'
import { Repository } from 'typeorm'
import { UserInfoVo } from '@/common/vo/user.vo'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(SysUser)
    private sysUser: Repository<SysUser>,
  ) {}

  public async fetch(username: string): Promise<User> {
    const user = await this.user.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'salt', 'email', 'nickname', 'avatar', 'status'],
    })
    return user
  }

  public async fetchById(id: string): Promise<User> {
    const user = await this.user.findOne({
      where: { id },
      select: ['id', 'username', 'password', 'salt', 'email', 'nickname', 'avatar', 'status'],
    })
    return user
  }

  public async register(data: RegisterDto) {
    const isExist = await this.fetch(data.username)
    if (isExist)
      throw new ConflictException('Username already exists')
    const user = this.user.create(data)
    return this.user.save(user)
  }

  // ------------------- sys user -------------------

  public async fetchSysUser(username: string): Promise<SysUser> {
    const user = await this.sysUser.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'salt', 'email', 'nickname', 'avatar', 'status'],
      relations: ['roles', 'roles.permissions'],
    })
    return user
  }

  public async fetchSysUserWithPerms(username: string): Promise<UserInfoVo> {
    const user = await this.sysUser.findOne({
      where: { username },
      select: ['id', 'username', 'email', 'nickname', 'avatar', 'status'],
      relations: ['roles', 'roles.permissions'],
    })
    const userInfoVo = new UserInfoVo()
    Object.assign(userInfoVo, user)
    userInfoVo.roles = user.roles.map(role => role.code)
    userInfoVo.perms = _.uniq(user.roles.flatMap(role => role.permissions.map(perm => perm.code)))
    return userInfoVo
  }

  public async fetchSysUserById(id: string): Promise<SysUser> {
    const user = await this.sysUser.findOne({
      where: { id },
      select: ['id', 'username', 'password', 'salt', 'email', 'nickname', 'avatar', 'status'],
    })
    return user
  }
}
