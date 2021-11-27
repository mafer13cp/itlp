export namespace ServiceKeys {
  export const MD5 = 'md5';
  export const AES = 'aes';
  export const SHA512 = 'sha512';
  export const AES_SEED = '@aes-secret.key*';
  export const TOKEN_EXP_TIME = Math.floor(Date.now() / 1000) * 3600;
  export const JWT_SECRET_KEY = '@JWT-secret*key.'
}
