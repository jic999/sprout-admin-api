import { INestApplication } from '@nestjs/common'
import { AdminService } from './admin/admin.service'

export async function initSystem(app: INestApplication<any>) {
  await app.get(AdminService).initAdmin()
}
