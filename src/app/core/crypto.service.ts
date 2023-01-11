import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor() {}

  encrypt(value: any) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), environment.SECRET_KEY).toString();
    return ciphertext;
  }

  decrypt(encryptedValue: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue.toString(), environment.SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
