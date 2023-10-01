import { BadRequestException, Body, Controller, Get, Headers, Post, Query, Req, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/auth'
import { LoginDto } from 'src/common/dto'
import { UserService } from 'src/user'
import { Request } from 'express'
import { Public } from '@/common/decorators'

@Controller()
export class AdminBaseController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @Public()
  public async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    if (!req.session.checkCode)
      throw new BadRequestException('Please refresh check code')
    if (req.session.checkCode.toLocaleUpperCase() !== loginDto.checkCode.toLocaleUpperCase())
      throw new BadRequestException('Invalid check code')
    const user = await this.authService.validateSysUser(loginDto.username, loginDto.password)
    if (!user)
      throw new UnauthorizedException('Invalid username or password')
    req.session.checkCode = null
    const userInfoVo = await this.userService.getSysUserWithPerms(user.username)
    return { user: userInfoVo, ...this.authService.jwtSign({ userId: user.id, username: user.username, roles: [] }) }
  }

  @Get('getUserInfo')
  public async getUserInfo(@Headers('Authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '')
    if (!token)
      throw new UnauthorizedException('No token')
    const payload = this.authService.getPayload(token)
    if (!payload?.username)
      throw new UnauthorizedException('Invalid token')
    const userInfoVo = await this.userService.getSysUserWithPerms(payload.username)
    return userInfoVo
  }

  @Get('refreshToken')
  public async refreshToken(@Query('token') token: string) {
    const payload = this.authService.getPayload(token)
    if (!payload?.userId || !this.authService.validateRefreshToken(payload, token))
      throw new UnauthorizedException('Invalid token')
    const user = await this.userService.getSysUserById(payload.userId)
    return this.authService.jwtSign({ userId: user.id, username: user.username })
  }

  @Post('/logout')
  public async logout() {
    return null
  }
}
