import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'file_reference' })
export class FileReference {
  @PrimaryColumn({ type: 'char', length: 64, comment: 'SHA256编码' })
  id: string

  @Column({ type: 'int', default: 1, comment: '引用次数' })
  count: number
}
