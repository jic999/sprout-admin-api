import { BeforeInsert, Column, DeleteDateColumn, PrimaryColumn } from 'typeorm'
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { CryptoUtil, pwdCrypto } from 'src/common/utils'
import { DiscordSnowflake } from '@sapphire/snowflake'
import { TimeBase } from './time-base.entity'

export class BaseUser extends TimeBase {
  @PrimaryColumn({ type: 'bigint' })
  @IsString()
  id: string

  @Column({ type: 'varchar', length: 30, unique: true })
  @IsString()
  @Length(5, 30)
  username: string

  @Column({ type: 'varchar', length: 30, nullable: true })
  @IsString()
  @Length(1, 30)
  nickname: string

  @Column({ type: 'varchar', length: 100, select: false })
  @IsString()
  @Length(6, 30)
  password: string

  @Column({ type: 'int', default: 2, comment: '性别，0女，1男，2未知' })
  @IsNumber()
  @IsIn([0, 1, 2])
  gender: number

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsEmail()
  email: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsNotEmpty()
  avatar: string

  @Column({ type: 'int', default: 0, comment: '状态，0正常，1禁用' })
  @IsIn([0, 1])
  status: number

  @Column({ type: 'varchar', length: 30, nullable: true, select: false, comment: '盐' })
  salt: string

  @DeleteDateColumn()
  deleteTime: number

  @BeforeInsert()
  beforeInsert() {
    this.id = DiscordSnowflake.generate().toString()
    this.salt = CryptoUtil.generateSalt(8)
    this.password = pwdCrypto.encrypt(this.password, this.salt)
  }
}
