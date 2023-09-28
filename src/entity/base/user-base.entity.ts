import { BeforeInsert, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from 'class-validator'
import { CryptoUtil, pwdCrypto } from 'src/common/utils'

export class BaseUser {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsEmail()
  email: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsNotEmpty()
  avatar: string

  @Column({ type: 'tinyint', default: 0, comment: '状态，0正常，1禁用' })
  @IsIn([0, 1])
  status: number

  @Column({ type: 'varchar', length: 30, nullable: true, select: false, comment: '盐' })
  salt: string

  @DeleteDateColumn()
  deleteTime: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date

  @BeforeInsert()
  beforeInsert() {
    this.salt = CryptoUtil.generateSalt(8)
    this.password = pwdCrypto.encrypt(this.password, this.salt)
  }
}
