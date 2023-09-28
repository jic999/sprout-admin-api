import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '@/auth'
import { SysUserService } from '@/admin/sys-user/sys-user.service'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private sysUserService: SysUserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // pass public
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      'isPublic',
      [context.getHandler(), context.getClass()],
    )
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    )
    if (isPublic || !requiredPermissions?.length)
      return true
    // get and check token
    const request = context.switchToHttp().getRequest()
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid token')
    const payload = this.authService.getPayload(token)
    if (!payload?.userId)
      throw new UnauthorizedException('Invalid token')
    // check permission
    const perms = await this.sysUserService.findPermissionNames(payload.userId)
    // TODO cache user perms
    const pass = requiredPermissions.every(item => perms.includes(item))
    if (!pass)
      throw new ForbiddenException('No permission')
    return true
  }
}
