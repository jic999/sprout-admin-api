import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const config = {
  db: {
    namingStrategy: new SnakeNamingStrategy(),
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}
