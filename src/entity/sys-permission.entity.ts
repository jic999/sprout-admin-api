import { Type } from 'class-transformer'
import { IsNumber, IsString, Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TimeBase } from './base/time-base.entity'

@Entity('sys_permission')
export class SysPermission extends TimeBase {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsNumber()
  id: number

  @Column({ type: 'int', default: 0, comment: '父级id' })
  @IsNumber()
  parentId: number

  @Column({ type: 'varchar', length: 50, comment: '角色名称' })
  @IsString()
  @Length(1, 30)
  name: string

  @Column({ type: 'varchar', length: 50, unique: true, comment: '角色标识' })
  @IsString()
  @Length(1, 30)
  code: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  desc: string
}
