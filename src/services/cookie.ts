import { Encryption, Storage, StorageConfig } from 'types/browser-storage';
import { CookieUtil } from 'utils/cookie';
import { parseToJSON } from 'utils/parse';

export class CookieStorage<T> extends Storage<T> {
  get config(): StorageConfig | null {
    const value = this.get();
    if (!value) return null;
    return value.config;
  }
  get value(): T | null {
    const value = this.get();
    if (!value) return null;
    return value?.data;
  }

  constructor(key: string, sensitive: boolean, version: number, encryption?: Encryption) {
    super(key, sensitive, version, encryption);
    this.clearOutDatedData();
  }

  get(): { data: T; config: StorageConfig } | null {
    if (this.sensitive && this.encryption) {
      const encrypted = CookieUtil.get(this.key);
      if (encrypted === null) return null;
      const plainText = this.encryption.decrypt(encrypted, this.encryption.secretKey);
      return parseToJSON(plainText);
    } else {
      return CookieUtil.getJSON(this.key);
    }
  }

  save(value: string, expires: string) {
    let data = value;
    if (this.sensitive && this.encryption) {
      data = this.encryption.encrypt(data, this.encryption.secretKey);
    }
    CookieUtil.set(this.key, data, expires);
  }

  update(value: Partial<T>, expiresHours?: number) {
    if (!this.config) return;
    let expires = this.config.expires;
    if (expiresHours) {
      expires = new Date(Date.now() + 3600 * 1000 * expiresHours).toUTCString();
    }
    const updated = { data: { ...this.value, ...value }, config: { ...this.config, expires } };
    this.save(JSON.stringify(updated), expires);
  }

  set(value: T, expiresHours: number) {
    const expires = new Date(Date.now() + 3600 * 1000 * expiresHours).toUTCString();
    const stored = { data: value, config: { expires, version: this.version } };
    this.save(JSON.stringify(stored), expires);
  }

  clear() {
    CookieUtil.clear(this.key);
  }

  clearOutDatedData() {
    if (this.config?.version !== this.version) {
      this.clear();
    }
  }
}
