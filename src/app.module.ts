import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { isDemoMode } from '@common/utils'
import { AuthModule } from './auth'
import { configuration } from './config'
import { UserModule } from './user'
import { routes } from './routes'

import { AdminModule } from './admin/admin.module'
import { FileModule } from './file/file.module'
import { EnvGuard } from './common/guards/env.guard'

const imports = [
  RouterModule.register(routes),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      ...config.get<TypeOrmModuleOptions>('db'),
    }),
    inject: [ConfigService],
  }),
  UserModule,
  AuthModule,
  AdminModule,
  FileModule,
]

!isDemoMode() && imports.push(
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../static'),
    serveRoot: '/static',
  }),
)

@Module({
  imports,
  providers: [
    {
      provide: APP_GUARD,
      useClass: EnvGuard,
    },
  ],
})
export class AppModule {}
