import { Encryption, Storage, StorageConfig } from 'types/browser-storage';
import { LocalStorageUtil } from 'utils/local-storage';
import { parseToJSON } from 'utils/parse';

export class LocalStorage<T> extends Storage<T> {
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
      const encrypted = LocalStorageUtil.get(this.key);
      if (encrypted === null) return null;
      const plainText = this.encryption.decrypt(encrypted, this.encryption.secretKey);
      return parseToJSON(plainText);
    } else {
      return LocalStorageUtil.getJSON(this.key);
    }
  }

  save(value: string) {
    let data = value;
    if (this.sensitive && this.encryption) {
      data = this.encryption.encrypt(data, this.encryption.secretKey);
    }
    LocalStorageUtil.set(this.key, data);
  }

  update(value: Partial<T>, expiresHours?: number) {
    if (!this.config) return;
    let expires = this.config.expires;
    if (expiresHours) {
      expires = new Date(Date.now() + 3600 * 1000 * expiresHours).toUTCString();
    }
    const updated = { data: { ...this.value, ...value }, config: { ...this.config, expires } };
    this.save(JSON.stringify(updated));
  }

  set(value: T) {
    const stored = { data: value, config: { version: this.version } };
    this.save(JSON.stringify(stored));
  }

  clear() {
    LocalStorageUtil.clear(this.key);
  }

  clearOutDatedData() {
    if (this.config?.version !== this.version) {
      this.clear();
    }
  }
}
