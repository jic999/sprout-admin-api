import { AfterLoad, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class TimeBase {
  @CreateDateColumn()
  createTime: string

  @UpdateDateColumn()
  updateTime: string

  @AfterLoad()
  formatTime() {
    if (this.createTime)
      this.createTime = new Date(this.createTime).toLocaleString()
    if (this.updateTime)
      this.updateTime = new Date(this.updateTime).toLocaleString()
  }
}
