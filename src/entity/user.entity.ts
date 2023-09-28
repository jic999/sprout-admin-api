import { Entity } from 'typeorm'
import { BaseUser } from './base/user-base.entity'

@Entity({ name: 'user' })
export class User extends BaseUser {}
