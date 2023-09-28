import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import * as svgCaptcha from 'svg-captcha'

@Controller('user')
export class UserController {
  @Get('getCheckCode')
  public getCheckCode(@Req() req: Request, @Res() res: Response) {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 3,
      ignoreChars: '0o1i',
      color: true,
      background: '#a8a7a6',
    })
    req.session.checkCode = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
}
