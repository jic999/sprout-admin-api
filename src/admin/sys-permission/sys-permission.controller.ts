import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { SysPermissionService } from './sys-permission.service'
import { CreateSysPermissionDto, SysPermissionIdDto, UpdateSysPermissionDto } from './sys-permission.dto'
import { SysPermTree } from './sys-permission.vo'
import { Permission } from '@/common/decorators'

@Controller('sys-perm')
export class SysPermissionController {
  constructor(
    private sysPermissionService: SysPermissionService,
  ) {}

  @Post()
  @Permission('sys:perm:create')
  public create(@Body() body: CreateSysPermissionDto) {
    return this.sysPermissionService.create(body)
  }

  @Patch()
  @Permission('sys:perm:update')
  public update(@Body() body: UpdateSysPermissionDto) {
    return this.sysPermissionService.update(body)
  }

  @Delete(':id')
  @Permission('sys:perm:delete')
  public remove(@Param() param: SysPermissionIdDto) {
    return this.sysPermissionService.remove(param.id)
  }

  @Get(':id')
  @Permission('sys:perm:read')
  public getById(@Param() param: SysPermissionIdDto) {
    return this.sysPermissionService.getById(param.id)
  }

  @Get()
  @Permission('sys:perm:read')
  public async findAll() {
    const perms = await this.sysPermissionService.findAll()
    const data = perms
      .filter(perm => perm.parentId === 0)
      .map(perm => buildPermTree(perm, perms))
    return data
  }
}

function buildPermTree(parentPerm: SysPermTree, perms: SysPermTree[]) {
  perms.forEach((perm) => {
    if (perm.parentId !== parentPerm.id)
      return
    if (!parentPerm.children)
      parentPerm.children = []
    buildPermTree(perm, perms)
    parentPerm.children.push(perm)
  })
  return parentPerm
}
