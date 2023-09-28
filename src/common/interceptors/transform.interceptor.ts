import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  code: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const { method, originalUrl } = request
    const now = Date.now()

    return next.handle().pipe(
      map((data) => {
        const responseTime = Date.now() - now
        const { statusCode } = response
        const logFormat = `Response ${JSON.stringify({
          statusCode,
          responseTime: `${responseTime}ms`,
          method,
          originalUrl,
          data,
        })}`
        Logger.log(logFormat, TransformInterceptor.name)

        return {
          code: 200,
          message: 'Request success',
          data,
        }
      }),
    )
  }
}
