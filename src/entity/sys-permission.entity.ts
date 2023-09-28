import { Type } from 'class-transformer'
import { IsNumber, IsString, Length } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('sys_permission')
export class SysPermission {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsNumber()
  id: number

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsString()
  @Length(1, 50)
  name: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  desc: string

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
