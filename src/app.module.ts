import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RouterModule } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth'
import { configuration } from './config'
import { UserModule } from './user'
import { routes } from './routes'

import { AdminModule } from './admin/admin.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../static'),
      serveRoot: '/static',
    }),
    UserModule,
    AuthModule,
    AdminModule,
    FileModule,
  ],
})
export class AppModule {}
