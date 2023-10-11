import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const config = {
  db: {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: true,
    logging: true,
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
  } as TypeOrmModuleOptions,
}
