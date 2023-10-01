import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { SysRoleService } from './sys-role.service'
import { AssignPermsDto, CreateSysRoleDto, SysRoleIdDto, UpdateSysRoleDto } from './sys-role.dto'
import { Permission } from '@/common/decorators'

@Controller('sys-role')
export class SysRoleController {
  constructor(
    private sysRoleService: SysRoleService,
  ) {}

  @Post()
  @Permission('sys:role:create')
  public async create(@Body() body: CreateSysRoleDto) {
    return await this.sysRoleService.create(body)
  }

  @Patch()
  @Permission('sys:role:update')
  public async update(@Body() body: UpdateSysRoleDto) {
    return await this.sysRoleService.update(body)
  }

  @Delete(':id')
  @Permission('sys:role:delete')
  public async remove(@Param() param: SysRoleIdDto) {
    return await this.sysRoleService.remove(param.id)
  }

  @Get(':id')
  @Permission('sys:role:read')
  public async getById(@Param() param: SysRoleIdDto) {
    return await this.sysRoleService.getById(param.id)
  }

  @Get()
  @Permission('sys:role:read')
  public async findAll() {
    return await this.sysRoleService.findAll()
  }

  @Post('assignPerms')
  @Permission('sys:role:assignPerms')
  public async assignPerms(@Body() body: AssignPermsDto) {
    return await this.sysRoleService.assignPerms(body)
  }
}
