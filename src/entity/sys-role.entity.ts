import { IsNumber, IsString, Length } from 'class-validator'
import { Type } from 'class-transformer'
import { AfterLoad, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { SysPermission } from './sys-permission.entity'
import { TimeBase } from './base/time-base.entity'

@Entity({ name: 'sys_role' })
export class SysRole extends TimeBase {
  @PrimaryGeneratedColumn('increment')
  @Type(() => Number)
  @IsNumber()
  id: number

  @Column({ type: 'varchar', length: 50, comment: '角色名称' })
  @IsString()
  @Length(1, 30)
  name: string

  @Column({ type: 'varchar', length: 50, unique: true, comment: '角色标识' })
  @IsString()
  @Length(1, 30)
  code: string

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '角色描述' })
  @IsString()
  desc: string

  @ManyToMany(() => SysPermission)
  @JoinTable({ name: 'sys_role_permission' })
  permissions: SysPermission[]
}
