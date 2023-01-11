import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cryptoService: CryptoService) {}

  setItem(key: string, value: any) {
    if (value) localStorage.setItem(key, this.cryptoService.encrypt(JSON.stringify(value)));
  }

  getItem(key: string) {
    if (key) {
      return localStorage.getItem(key) ? JSON.parse(this.cryptoService.decrypt(localStorage.getItem(key))) : '';
    }
  }

  removeItem(key: string) {
    if (key) {
      localStorage.removeItem(key);
    }
  }

  clearAll() {
    localStorage.clear();
  }
}
