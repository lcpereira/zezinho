import { Injectable } from '@angular/core';
import { StorageKey } from '@shared/enums/storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(key: StorageKey): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: StorageKey, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItemAsJSON<T>(key: StorageKey): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
