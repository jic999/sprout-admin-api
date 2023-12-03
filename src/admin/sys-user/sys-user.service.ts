import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Not, Repository } from 'typeorm'
import { AssignRolesDto, CreateSysUserDto, SysUserPageDto, UpdateSysUserDto } from './sys-user.dto'
import { SysRole, SysUser } from '@/entity'
import { enhanceQuery } from '@/common/utils'

@Injectable()
export class SysUserService {
  constructor(
    @InjectRepository(SysUser)
    private sysUser: Repository<SysUser>,
    @InjectRepository(SysRole)
    private sysRole: Repository<SysRole>,
  ) {}

  public async create(data: CreateSysUserDto): Promise<SysUser> {
    // Query whether the username exists
    const isExist = await this.sysUser.exist({ where: { username: data.username } })
    if (isExist)
      throw new ConflictException('Username already exists')

    const user = this.sysUser.create(data)
    user.password = '123456'

    return this.sysUser.save(user)
  }

  public async update(data: UpdateSysUserDto): Promise<SysUser> {
    const user = await this.sysUser.findOneBy({ id: data.id })
    if (!user)
      throw new ConflictException('User does not exist')
    if (
      data.username
      && data.username !== user.username
      && this.sysUser.exist({ where: { username: data.username, id: Not(data.id) } })
    )
      throw new ConflictException('Username already exists')
    return this.sysUser.save(Object.assign(user, data))
  }

  public async remove(id: string): Promise<SysUser> {
    const user = await this.sysUser.findOneBy({ id })
    if (!user)
      throw new ConflictException('User does not exist')
    return await this.sysUser.softRemove(user)
  }

  public async getById(id: string): Promise<SysUser> {
    const user = await this.sysUser.findOneBy({ id })
    if (!user)
      throw new BadRequestException('User does not exist')
    return user
  }

  public async findAll(): Promise<SysUser[]> {
    return this.sysUser.find()
  }

  public async findPermissionCodes(id: string): Promise<string[]> {
    const user = await this.sysUser.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions'],
    })
    const permissions = user.roles.map(role => role.permissions.map(permission => permission.code))
    return Array.from(new Set(permissions.flat()))
  }

  public async assignRoles(data: AssignRolesDto): Promise<SysUser> {
    const user = await this.sysUser.findOneBy({ id: data.id })
    if (!user)
      throw new ConflictException('User does not exist')

    const roles = await this.sysRole.findBy({ id: In(data.roleIds) })
    user.roles = roles
    return this.sysUser.save(user)
  }

  public async getCount(): Promise<number> {
    return this.sysUser.count()
  }

  public async page(data: SysUserPageDto) {
    const page = await enhanceQuery(this.sysUser).page(data, {
      select: ['id', 'username', 'nickname', 'avatar', 'email', 'gender', 'status', 'createTime'],
      relations: ['roles'],
    })
    return page
  }

  public async fetchWithRoles(id: string): Promise<SysUser> {
    const user = await this.sysUser.findOne({
      where: { id },
      relations: ['roles'],
    })
    if (!user)
      throw new BadRequestException('User does not exist')
    return user
  }

  public async batchRemove(ids: string[]): Promise<SysUser[]> {
    const users = await this.sysUser.findBy({ id: In(ids) })
    return await this.sysUser.softRemove(users)
  }
}
