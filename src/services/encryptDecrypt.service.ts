import {ServiceKeys as keys} from '../keys/service-keys';
const CryptoJS = require("crypto-js");

export class EncryptDecrypt {
  type: string;
  constructor(type: string) {
    this.type= type;
  }

  Ecrypt(text:string){
    switch (this.type) {
      case keys.MD5:
          return CryptoJS.MD5(text).toString();
      break;
      case keys.AES:
        return CryptoJS.AES.Encrypt(text, keys.AES_SEED).toString();
        break;
      default:
        return 'Encryption type not supported.'
        break;
    }
  }
}
