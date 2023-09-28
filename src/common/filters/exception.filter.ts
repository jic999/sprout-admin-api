import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response } from 'express'

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    let message = exception.message

    // validation exception
    if (exception instanceof BadRequestException) {
      const errMessage = (exception?.getResponse() as any)?.message as string[]
      message = Array.isArray(errMessage) ? errMessage.join(', ') : message
    }

    // log request info and error stack
    Logger.warn(`${request.method} ${request.url} ${status} ${message}`, GlobalExceptionFilter.name)

    response
      .status(status)
      .json({
        code: status,
        message,
      })
  }
}
