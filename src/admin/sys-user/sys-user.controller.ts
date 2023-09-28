import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { SysUserService } from './sys-user.service'
import { AssignRolesDto, CreateSysUserDto, UpdateSysUserDto } from './sys-user.dto'
import { SysUser } from '@/entity'
import { Permission } from '@/common/decorators'
import { UserIdDto } from '@/common/dto'

@Controller('sys-user')
export class SysUserController {
  constructor(
    private sysUserService: SysUserService,
  ) {}

  @Post()
  @Permission('sys:user:create')
  public async create(@Body() body: CreateSysUserDto): Promise<null> {
    await this.sysUserService.create(body)
    return null
  }

  @Patch()
  @Permission('sys:user:update')
  public async update(@Body() body: UpdateSysUserDto): Promise<null> {
    await this.sysUserService.update(body)
    return null
  }

  @Delete(':id')
  @Permission('sys:user:delete')
  public async remove(@Param() param: UserIdDto): Promise<null> {
    await this.sysUserService.remove(param.id)
    return null
  }

  @Get(':id')
  @Permission('sys:user:read')
  public async fetch(@Param() param: UserIdDto): Promise<SysUser> {
    return this.sysUserService.fetch(param.id)
  }

  @Get()
  @Permission('sys:user:read')
  public async findAll(): Promise<SysUser[]> {
    return this.sysUserService.findAll()
  }

  @Post('assignRoles')
  @Permission('sys:user:assignRoles')
  public async assignRoles(@Body() body: AssignRolesDto): Promise<null> {
    await this.sysUserService.assignRoles(body)
    return null
  }
}
