import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { SysPermissionService } from './sys-permission.service'
import { CreateSysPermissionDto, SysPermissionIdDto, UpdateSysPermissionDto } from './sys-permission.dto'
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
  public fetch(@Param() param: SysPermissionIdDto) {
    return this.sysPermissionService.fetch(param.id)
  }

  @Get()
  @Permission('sys:perm:read')
  public findAll() {
    return this.sysPermissionService.findAll()
  }
}
