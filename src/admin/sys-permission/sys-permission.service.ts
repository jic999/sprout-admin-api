import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SysPermission } from '@entity'
import { CreateSysPermissionDto, UpdateSysPermissionDto } from './sys-permission.dto'

@Injectable()
export class SysPermissionService {
  constructor(
    @InjectRepository(SysPermission)
    private readonly sysPermission: Repository<SysPermission>,
  ) {}

  public async create(data: CreateSysPermissionDto): Promise<SysPermission> {
    const perm = this.sysPermission.create(data)
    return await this.sysPermission.save(perm)
  }

  public async update(data: UpdateSysPermissionDto): Promise<SysPermission> {
    const perm = await this.sysPermission.findOneBy({ id: data.id })
    return await this.sysPermission.save(Object.assign(perm, data))
  }

  public async remove(id: number): Promise<SysPermission> {
    const perm = await this.sysPermission.findOneBy({ id })
    return await this.sysPermission.remove(perm)
  }

  public async getById(id: number): Promise<SysPermission> {
    return await this.sysPermission.findOneBy({ id })
  }

  public async findAll(): Promise<SysPermission[]> {
    return await this.sysPermission.find()
  }

  // ------------------ dev api ------------------
  public async batchCreate(data: CreateSysPermissionDto[]): Promise<SysPermission[]> {
    const perms = this.sysPermission.create(data)
    return await this.sysPermission.save(perms)
  }
}
