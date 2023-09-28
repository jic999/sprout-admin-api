import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUser } from 'src/entity/sys-user.entity'
import { UserModule } from 'src/user'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([SysUser]),
    UserModule,
  ],
})
export class AdminBaseModule {}
