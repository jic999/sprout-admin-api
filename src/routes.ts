import { Routes } from '@nestjs/core'
import { AdminModule } from './admin/admin.module'

export const routes: Routes = [
  {
    path: 'admin',
    module: AdminModule,
  },
]
