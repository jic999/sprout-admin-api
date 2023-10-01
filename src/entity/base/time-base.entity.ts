import { AfterLoad, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class TimeBase {
  @CreateDateColumn()
  createTime: string

  @UpdateDateColumn()
  updateTime: string

  @AfterLoad()
  formatTime() {
    this.createTime = new Date(this.createTime).toLocaleString()
    this.updateTime = new Date(this.updateTime).toLocaleString()
  }
}
