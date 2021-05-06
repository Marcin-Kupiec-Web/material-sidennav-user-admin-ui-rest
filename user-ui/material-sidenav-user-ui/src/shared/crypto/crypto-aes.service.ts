import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CryptoAESService {


  tokenFromUI = '4503938fjek28567';
  encrypted: any = '';
  decrypted: string;

  request: string;
  responce: string;

  constructor() {}

  encryptUsingAES256(requestEncrypt): string {
    const key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const ive = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(requestEncrypt), key, {
        keySize: 16,
        iv: ive,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }


  decryptUsingAES256(requestDecrypt): string {
    const key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const ive = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    return  requestDecrypt = CryptoJS.AES.decrypt(
      requestDecrypt, key, {
        keySize: 16,
        iv: ive,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }
}
