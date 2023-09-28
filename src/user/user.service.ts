import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegisterDto } from 'src/common/dto/user.dto'
import { SysUser } from 'src/entity/sys-user.entity'
import { User } from 'src/entity/user.entity'
import { Repository } from 'typeorm'

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
    })
    return user
  }

  public async fetchSysUserById(id: string): Promise<SysUser> {
    const user = await this.sysUser.findOne({
      where: { id },
      select: ['id', 'username', 'password', 'salt', 'email', 'nickname', 'avatar', 'status'],
    })
    return user
  }
}
