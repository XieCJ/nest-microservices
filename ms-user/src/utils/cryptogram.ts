import * as crypto from 'crypto';

// 获取盐值
export function getSalt(): string {
  return crypto.randomBytes(3).toString('hex');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'hex');
  return crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64');
}