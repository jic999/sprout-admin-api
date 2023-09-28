import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { ConflictException, Injectable } from '@nestjs/common'
import { AssignPermsDto, CreateSysRoleDto, UpdateSysRoleDto } from './sys-role.dto'
import { SysPermission, SysRole } from '@/entity'

@Injectable()
export class SysRoleService {
  constructor(
    @InjectRepository(SysRole)
    private sysRole: Repository<SysRole>,
    @InjectRepository(SysPermission)
    private sysPermission: Repository<SysPermission>,
  ) {}

  public async create(data: CreateSysRoleDto): Promise<SysRole> {
    if (await this.sysRole.exist({ where: { name: data.name } }))
      throw new ConflictException('Role name already exists')
    const { permIds, ...roleInfo } = data
    const role = this.sysRole.create(roleInfo)
    if (permIds?.length) {
      const perms = await this.sysPermission.findBy({ id: In(permIds) })
      role.permissions = perms
    }
    return this.sysRole.save(role)
  }

  public async update(data: UpdateSysRoleDto): Promise<SysRole> {
    const role = await this.sysRole.findOneBy({ id: data.id })
    if (!role)
      throw new ConflictException('Role does not exist')
    return this.sysRole.save(Object.assign(role, data))
  }

  public async remove(id: number): Promise<SysRole> {
    const role = await this.sysRole.findOneBy({ id })
    if (!role)
      throw new ConflictException('Role does not exist')
    return this.sysRole.softRemove(role)
  }

  public async fetch(id: number): Promise<SysRole> {
    return this.sysRole.findOneBy({ id })
  }

  public async findAll(): Promise<SysRole[]> {
    return this.sysRole.find()
  }

  public async assignPerms(data: AssignPermsDto): Promise<SysRole> {
    const role = await this.sysRole.findOneBy({ id: data.id })
    if (!role)
      throw new ConflictException('Role does not exist')
    const perms = await this.sysPermission.findBy({ id: In(data.permIds) })
    role.permissions = perms
    return this.sysRole.save(role)
  }
}
