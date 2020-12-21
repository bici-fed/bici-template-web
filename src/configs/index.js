// project config

// "NODE_ENV" is env value to distinguishing between environment,
// in a general way, it could to be the following values like: "dev", "staging", "pro".
const NODE_ENV = 'dev';

const apiUrlMap = {
  dev: 'http://bici.test.com/api',
  staging: 'http://bici.staging.com/api',
  pro: 'http://bici.production.com/api',
};

const wsUrlMap = {
  dev: 'ws://bici.test.com/ws',
  staging: 'ws://bici.staging.com/ws',
  pro: 'ws://bici.production.com/ws',
};

// the root key for redux-persist, it is necessary to separate persist data from each project,
// we suggested use the project name as default.
export const reduxPersistKey = 'bici-template-web';

// jsencrypt is a Javascript library to perform OpenSSL RSA Encryption, Decryption, and Key Generation,
// we use jsencrypt to encrypt the pwd for login, the "privateKey" is from back-end and would be preseted as the "publicKey" for jsencrypt.
export const privateKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv';

export const apiUrl = apiUrlMap[NODE_ENV];

export const wsUrl = wsUrlMap[NODE_ENV];

export default { reduxPersistKey, privateKey, apiUrl, wsUrl };
