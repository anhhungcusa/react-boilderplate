import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';

export type Encryption = {
  encrypt: (plainText: string, secretKey: string) => string;
  decrypt: (encrypted: string, secretKey: string) => string;
  secretKey: string;
};

export type StorageConfig = { expires: string; version: number };

export abstract class Storage<T> {
  protected readonly key: string;
  protected readonly sensitive: boolean;
  protected readonly version: number;
  protected readonly encryption?: Encryption;

  constructor(key: string, sensitive: boolean, version: number, encryption?: Encryption) {
    const defaultEncryption = {
      encrypt: (plainText: string, secretKey: string) =>
        AES.encrypt(plainText, secretKey).toString(),
      decrypt: (encrypted: string, secretKey: string) =>
        AES.decrypt(encrypted, secretKey).toString(utf8),
      secretKey: `${key}-rc32`,
    };

    this.key = key;
    this.sensitive = sensitive || false;
    this.version = version;
    this.encryption = encryption || defaultEncryption;
  }

  protected abstract get(): { data: T; config: StorageConfig } | null;
  protected abstract save(value: string, expires: string): void;

  abstract set(value: T, expiresHours: number): void;
  abstract update(value: Partial<T>, expiresHours?: number): void;
  abstract clear(): void;
  abstract clearOutDatedData(): void;
}
