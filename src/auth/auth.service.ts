import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { UserService } from 'src/user'
import { pwdCrypto } from 'src/common/utils/crypto'
import type { JwtPayload, JwtSign, Payload } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
    private config: ConfigService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.user.fetch(username)
    if (!user || !pwdCrypto.validate(password, user.salt, user.password))
      return null
    const { password: _, salt: __, ...result } = user
    return result
  }

  public async validateSysUser(username: string, password: string) {
    const user = await this.user.fetchSysUser(username)
    if (!user || !pwdCrypto.validate(password, user.salt, user.password))
      return null
    const { password: _, salt: __, ...result } = user
    return result
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') }))
      return false

    const payload = <{ sub: string }> this.jwt.decode(refreshToken)
    return payload.sub === data.userId
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { sub: data.userId, username: data.username, roles: data.roles }

    return {
      accessToken: this.jwt.sign(payload),
      refreshToken: this.getRefreshToken(payload.sub),
    }
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = <JwtPayload | null> this.jwt.decode(token)
      if (!payload)
        return null

      return { userId: payload.sub, username: payload.username, roles: payload.roles }
    }
    catch {
      // Unexpected token i in JSON at position XX
      return null
    }
  }

  private getRefreshToken(sub: string): string {
    return this.jwt.sign(
      { sub },
      {
        secret: this.config.get('jwtRefreshSecret'),
        expiresIn: '7d', // Set greater than the expiresIn of the access_token
      },
    )
  }
}
