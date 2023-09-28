import { Body, Controller, Get, Headers, Post, Query, UnauthorizedException } from '@nestjs/common'
import { RegisterDto } from 'src/common/dto/user.dto'
import { UserService } from 'src/user'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  public async register(@Body() body: RegisterDto) {
    return this.userService.register(body)
  }

  @Post('login')
  public async login(@Body() body: RegisterDto) {
    const user = await this.authService.validateUser(body.username, body.password)
    if (!user)
      throw new UnauthorizedException('Invalid username or password')
    return { user, ...this.authService.jwtSign({ userId: user.id, username: user.username, roles: [] }) }
  }

  @Get('getUserInfo')
  public async getUserInfo(@Headers('Authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '')
    if (!token)
      throw new UnauthorizedException('No token')
    const payload = this.authService.getPayload(token)
    if (!payload?.username)
      throw new UnauthorizedException('Invalid token')
    const { salt: _salt, ...userInfo } = await this.userService.fetch(payload.username)
    return userInfo
  }

  @Get('refreshToken')
  public async refreshToken(@Query('token') token: string) {
    const payload = this.authService.getPayload(token)
    if (!payload?.userId || !this.authService.validateRefreshToken(payload, token))
      throw new UnauthorizedException('Invalid token')
    const user = await this.userService.fetch(payload.username)
    return this.authService.jwtSign({ userId: user.id, username: user.username, roles: [] })
  }
}
