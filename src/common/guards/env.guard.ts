import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'

const whiteListRoutes = ['/api/admin/login', '/api/admin/getUserInfo', '/api/admin/refreshToken', '/api/admin/logout']

@Injectable()
export class EnvGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    if (process.env.NODE_ENV !== 'demo')
      return true
    const request = context.switchToHttp().getRequest() as Request
    if (request.method === 'GET' || whiteListRoutes.includes(request.url))
      return true
    throw new BadRequestException('演示环境不允许操作数据')
  }
}
