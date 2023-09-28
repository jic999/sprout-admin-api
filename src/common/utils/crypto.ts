import * as crypto from 'node:crypto'

export class CryptoUtil {
  private iterations: number

  private keylen: number

  private digest: string

  constructor(iterations: number, keylen: number, digest: string) {
    this.iterations = iterations
    this.keylen = keylen
    this.digest = digest
  }

  public encrypt(value: string, salt: string): string {
    return crypto.pbkdf2Sync(value, salt, this.iterations, this.keylen, this.digest).toString('hex')
  }

  public validate(value: string, salt: string, encrypted: string): boolean {
    return this.encrypt(value, salt) === encrypted
  }

  public static generateSalt(len: number): string {
    return crypto.randomBytes(len).toString('hex')
  }
}

export const pwdCrypto = new CryptoUtil(1000, 32, 'sha256')
