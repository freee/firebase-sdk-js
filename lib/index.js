(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const freee_server_sdk_1 = __webpack_require__(/*! ./sdk/freee-server-sdk */ "./src/sdk/freee-server-sdk.ts");
exports.FreeeServerSDK = freee_server_sdk_1.default;


/***/ }),

/***/ "./src/sdk/api/freee-api-client.ts":
/*!*****************************************!*\
  !*** ./src/sdk/api/freee-api-client.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FreeeAPIClient {
    constructor(tokenManager, axios) {
        this.tokenManager = tokenManager;
        this.axios = axios;
    }
    /**
     * Call freee api by GET
     */
    get(url, params, userId) {
        return this.tokenManager.get(userId).then(accessToken => {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'X-Api-Version': '2020-06-15'
            };
            return this.axios.get(url, {
                params: params,
                headers: headers
            });
        });
    }
    /**
     * Call freee api by POST
     */
    post(url, data, userId) {
        return this.tokenManager.get(userId).then(accessToken => {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'X-Api-Version': '2020-06-15'
            };
            return this.axios.post(url, data, {
                headers: headers
            });
        });
    }
    /**
     * Call freee api by PUT
     */
    put(url, data, userId) {
        return this.tokenManager.get(userId).then(accessToken => {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'X-Api-Version': '2020-06-15'
            };
            return this.axios.put(url, data, {
                headers: headers
            });
        });
    }
    /**
     * Call freee api by GET
     */
    delete(url, data, userId) {
        return this.tokenManager.get(userId).then(accessToken => {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'X-Api-Version': '2020-06-15'
            };
            return this.axios.delete(url, {
                data: data,
                headers: headers
            });
        });
    }
}
exports.FreeeAPIClient = FreeeAPIClient;


/***/ }),

/***/ "./src/sdk/auth/freee-firebase-auth-client.ts":
/*!****************************************************!*\
  !*** ./src/sdk/auth/freee-firebase-auth-client.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_manager_1 = __webpack_require__(/*! ../services/config-manager */ "./src/sdk/services/config-manager.ts");
class FreeeFirebaseAuthClient {
    constructor(admin, oauth2, axios, tokenManager, config) {
        this.admin = admin;
        this.oauth2 = oauth2;
        this.axios = axios;
        this.tokenManager = tokenManager;
        // path setting
        const freeeConfigs = config.freee;
        const functionsConfigs = config_manager_1.ConfigManager.getFunctionsConfigs();
        this.clientId = functionsConfigs.freee.client_id;
        this.clientSecret = functionsConfigs.freee.client_secret;
        this.redirectPath = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.redirectPath);
        this.callbackPath = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.callbackPath);
        this.companiesPath = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.companiesPath);
        this.homePath = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.homePath);
        this.appHost = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.appHost);
        this.authHost = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.authHost);
        this.apiKey = config.firebase && config.firebase.apiKey;
    }
    /**
     * Redirect screen to authorize
     */
    redirect(res) {
        const redirectUri = this.oauth2.authorizationCode.authorizeURL({
            redirect_uri: `${this.authHost}${this.getCallbackPath()}`
        });
        res.redirect(redirectUri);
    }
    /**
     * Get token, save it to firebase and login firebase
     */
    async callback(code, res) {
        try {
            const result = await this.oauth2.authorizationCode
                .getToken({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                redirect_uri: `${this.authHost}${this.getCallbackPath()}`
            })
                .catch(() => {
                res.send(this.signInRefusedTemplate());
            });
            const freeeToken = {
                accessToken: result.access_token,
                refreshToken: result.refresh_token,
                expiresIn: result.expires_in,
                createdAt: result.created_at
            };
            // get freee user
            const response = await this.getFreeeUser(freeeToken.accessToken);
            const id = response.data.user.id;
            const email = response.data.user.email;
            // consider null value of displayName
            const displayName = response.data.user.display_name
                ? response.data.user.display_name
                : '';
            // Create a Firebase Account and get the custom Auth Token.
            const firebaseToken = await this.createFirebaseAccount(id, email, displayName, freeeToken);
            // redirect to home path with token info
            res.redirect(`${this.appHost}${this.homePath}?token=${firebaseToken}`);
        }
        catch (error) {
            console.error('Some error occured on login process:', error);
            res.status(401).send('Some error occured on login process');
        }
    }
    /**
     * path for redirect on freee authorization
     */
    getRedirectPath() {
        return this.redirectPath;
    }
    /**
     * path for callback on freee authorization
     */
    getCallbackPath() {
        return this.callbackPath;
    }
    /**
     * path for callback on freee authorization
     */
    getCompaniesPath() {
        return this.companiesPath;
    }
    /**
     * Create crypto key to bucket for it by specified date
     */
    async createCryptoKey(date) {
        await this.tokenManager.createCryptoKey(date);
    }
    getFreeeUser(accessToken) {
        return this.axios.get('/api/1/users/me?companies=true', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
    }
    /**
     * create firebase account and token
     */
    async createFirebaseAccount(id, email, displayName, freeeToken) {
        const uid = id.toString();
        await this.tokenManager.save(uid, email, freeeToken);
        // Create or update the user account.
        await this.admin
            .auth()
            .updateUser(uid, {
            email: email,
            displayName: displayName
        })
            .catch(async (error) => {
            if (error.code === 'auth/user-not-found') {
                return await this.admin.auth().createUser({
                    uid: uid,
                    email: email,
                    displayName: displayName
                });
            }
            throw error;
        });
        return await this.admin.auth().createCustomToken(uid);
    }
    /**
     * Script for redirection when user refuse sign-up
     */
    signInRefusedTemplate() {
        return `
      <script>
        window.location.href = '${this.appHost}'
      </script>`;
    }
}
exports.FreeeFirebaseAuthClient = FreeeFirebaseAuthClient;


/***/ }),

/***/ "./src/sdk/freee-server-sdk.ts":
/*!*************************************!*\
  !*** ./src/sdk/freee-server-sdk.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview sdk for freee api in server side
 */
const axios_1 = __webpack_require__(/*! axios */ "axios");
const admin = __webpack_require__(/*! firebase-admin */ "firebase-admin");
const freee_api_client_1 = __webpack_require__(/*! ./api/freee-api-client */ "./src/sdk/api/freee-api-client.ts");
const freee_firebase_auth_client_1 = __webpack_require__(/*! ./auth/freee-firebase-auth-client */ "./src/sdk/auth/freee-firebase-auth-client.ts");
const config_manager_1 = __webpack_require__(/*! ./services/config-manager */ "./src/sdk/services/config-manager.ts");
const freee_cryptor_1 = __webpack_require__(/*! ./services/freee-cryptor */ "./src/sdk/services/freee-cryptor.ts");
const token_manager_1 = __webpack_require__(/*! ./services/token-manager */ "./src/sdk/services/token-manager.ts");
class FreeeServerSDK {
    constructor(config, serviceAccount) {
        const freeeConfigs = config.freee;
        // Set up firebase admin
        if (serviceAccount) {
            // for local
            this.admin = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
                storageBucket: `${serviceAccount.project_id}.appspot.com`
            });
        }
        else {
            // Firebase setup by ADC
            this.admin = admin.initializeApp();
        }
        // Set up cryptor for freee token
        const cryptoKeyBucket = config_manager_1.ConfigManager.get(config.firebase, config_manager_1.ConfigKeys.cryptoKeyBucket);
        const cryptor = cryptoKeyBucket
            ? new freee_cryptor_1.default(this.admin.storage().bucket(cryptoKeyBucket))
            : null;
        // Set up oauth2 client
        const oauth2 = __webpack_require__(/*! simple-oauth2 */ "simple-oauth2").create(this.getCredentials(freeeConfigs));
        const tokenManager = new token_manager_1.TokenManager(this.admin, oauth2, cryptor);
        axios_1.default.defaults.baseURL = config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.apiHost);
        this.apiClient = new freee_api_client_1.FreeeAPIClient(tokenManager, axios_1.default);
        this.firebaseAuthClient = new freee_firebase_auth_client_1.FreeeFirebaseAuthClient(this.admin, oauth2, axios_1.default, tokenManager, config);
    }
    /**
     * get firebase admin instance
     */
    firebaseApp() {
        return this.admin;
    }
    /**
     * get firebase admin instance
     */
    api() {
        return this.apiClient;
    }
    /**
     * get firebase admin instance
     */
    auth() {
        return this.firebaseAuthClient;
    }
    getCredentials(freeeConfigs) {
        const freee = config_manager_1.ConfigManager.getFunctionsConfigs().freee;
        const credentials = {
            client: {
                id: freee.client_id,
                secret: freee.client_secret
            },
            auth: {
                tokenHost: config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.tokenHost),
                authorizePath: config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.authorizePath),
                tokenPath: config_manager_1.ConfigManager.get(freeeConfigs, config_manager_1.ConfigKeys.tokenPath)
            }
        };
        return credentials;
    }
}
exports.default = FreeeServerSDK;


/***/ }),

/***/ "./src/sdk/services/config-manager.ts":
/*!********************************************!*\
  !*** ./src/sdk/services/config-manager.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(/*! firebase-functions */ "firebase-functions");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const projectId = adminConfig.projectId;
const region = functions.config().env && functions.config().env.region
    ? functions.config().env.region
    : 'asia-northeast1';
var ConfigKeys;
(function (ConfigKeys) {
    ConfigKeys["apiHost"] = "apiHost";
    ConfigKeys["appHost"] = "appHost";
    ConfigKeys["authHost"] = "authHost";
    ConfigKeys["redirectPath"] = "redirectPath";
    ConfigKeys["callbackPath"] = "callbackPath";
    ConfigKeys["companiesPath"] = "companiesPath";
    ConfigKeys["homePath"] = "homePath";
    ConfigKeys["tokenHost"] = "tokenHost";
    ConfigKeys["authorizePath"] = "authorizePath";
    ConfigKeys["tokenPath"] = "tokenPath";
    ConfigKeys["cryptoKeyBucket"] = "cryptoKeyBucket";
})(ConfigKeys = exports.ConfigKeys || (exports.ConfigKeys = {}));
/**
 * Default value definitions for {@link SDKFreeeConfig}
 *
 * @see {SDKFreeeConfig}
 */
const DEFAULT_CONFIGS = {
    freee: [
        {
            key: ConfigKeys.apiHost,
            default: 'https://api.freee.co.jp',
            production: 'https://api.freee.co.jp'
        },
        {
            key: ConfigKeys.appHost,
            default: 'http://localhost:5000',
            production: `https://${projectId}.web.app`
        },
        {
            key: ConfigKeys.authHost,
            default: `http://localhost:5001/${projectId}/${region}/api/auth`,
            production: `https://${region}-${projectId}.cloudfunctions.net/api/auth`
        },
        {
            key: ConfigKeys.redirectPath,
            default: '/redirect'
        },
        {
            key: ConfigKeys.callbackPath,
            default: '/callback'
        },
        {
            key: ConfigKeys.companiesPath,
            default: '/companies'
        },
        {
            key: ConfigKeys.homePath,
            default: '/'
        },
        {
            key: ConfigKeys.tokenHost,
            default: 'https://accounts.secure.freee.co.jp',
            production: 'https://accounts.secure.freee.co.jp'
        },
        {
            key: ConfigKeys.authorizePath,
            default: '/public_api/authorize'
        },
        {
            key: ConfigKeys.tokenPath,
            default: '/public_api/token'
        }
    ],
    firebase: [
        {
            key: ConfigKeys.cryptoKeyBucket,
            default: `${projectId}.appspot.com`
        }
    ]
};
class ConfigManager {
    static get(configs, key) {
        if (configs && this.hasKey(configs, key)) {
            return configs[key];
        }
        return this.getDefaultValue(key);
    }
    static getFunctionsConfigs() {
        return functions.config();
    }
    static getDefaultValue(key) {
        const defaultConfigs = []
            .concat(DEFAULT_CONFIGS.freee)
            .concat(DEFAULT_CONFIGS.firebase);
        const config = defaultConfigs.find(config => config.key === key);
        return this.isProduction() && config.production
            ? config.production
            : config.default;
    }
    static isProduction() {
        const configs = this.getFunctionsConfigs();
        return configs.env && configs.env.mode === 'production';
    }
    static hasKey(configs, key) {
        return Object.keys(configs).find(configKey => configKey === key);
    }
}
exports.ConfigManager = ConfigManager;


/***/ }),

/***/ "./src/sdk/services/freee-cryptor.ts":
/*!*******************************************!*\
  !*** ./src/sdk/services/freee-cryptor.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const crypto = __webpack_require__(/*! crypto */ "crypto");
const ALGORITHM = 'aes-256-cbc';
const OUT = 'base64';
const IN = 'utf8';
const IV_LENGTH = 16;
class FreeeCryptor {
    constructor(bucket) {
        this.bucket = bucket;
        this.keyCache = {};
    }
    /**
     * Create crypto key to bucket for it by specified date
     */
    async createCryptoKey(date) {
        const keyFileName = date_fns_1.format(date, 'yyyyMM');
        return this.create(keyFileName);
    }
    /**
     * Encrypt freee token
     *
     * @param {Object} token
     * @param {string} token.accessToken
     * @param {string} token.refreshToken
     *
     * @return {Promise<Object>} - encrypted freee token object
     */
    async encrypt(token) {
        const { accessToken, refreshToken } = token;
        const keyFileName = date_fns_1.format(new Date(), 'yyyyMM');
        const key = await this.getKey(keyFileName);
        const iv = crypto.randomBytes(IV_LENGTH);
        return Object.assign(Object.assign({}, token), { accessToken: this.crypt(accessToken, this.cipher(key, iv), IN, OUT), refreshToken: this.crypt(refreshToken, this.cipher(key, iv), IN, OUT), keyFileName, algorithm: ALGORITHM, iv });
    }
    /**
     * Decrypt freee token
     *
     * @param {Object} token
     * @param {string} token.accessToken
     * @param {string} token.refreshToken
     * @param {string} token.keyFileName
     * @param {string} token.algorithm
     * @param {Buffer} token.iv
     *
     * @return {Promise<Object>} - decrypted freee token object
     */
    async decrypt(token) {
        const { accessToken, refreshToken, keyFileName, algorithm, iv } = token;
        const key = await this.getKey(keyFileName);
        console.log(`FreeeCryptor_decrypt_getKey:`, { decryptKey: key });
        return Object.assign(Object.assign({}, token), { accessToken: this.crypt(accessToken, this.decipher(algorithm, key, iv), OUT, IN), refreshToken: this.crypt(refreshToken, this.decipher(algorithm, key, iv), OUT, IN) });
    }
    cipher(cryptoKey, iv) {
        return crypto.createCipheriv(ALGORITHM, cryptoKey, iv);
    }
    decipher(algorithm, cryptoKey, iv) {
        return crypto.createDecipheriv(algorithm, cryptoKey, iv);
    }
    async getKey(keyFileName) {
        if (this.keyCache[keyFileName]) {
            return this.keyCache[keyFileName];
        }
        try {
            return await this.get(keyFileName);
        }
        catch (error) {
            console.info('No key file for:', keyFileName);
            await this.create(keyFileName);
            return await this.get(keyFileName);
        }
    }
    crypt(targetStr, algorithm, inputEncoding, outputEncoding) {
        let result = algorithm.update(targetStr, inputEncoding, outputEncoding);
        console.log(`FreeeCryptor_crypt_update:`, { updateResult: result });
        result += algorithm.final(outputEncoding);
        console.log(`FreeeCryptor_crypt_final:`, { cryptFinalResult: result });
        return result;
    }
    async create(keyFileName) {
        const encryptionKey = crypto.randomBytes(32);
        const keyFile = this.bucket.file(keyFileName);
        await keyFile.save(encryptionKey);
        console.log('New crypto key is successfully created for:', keyFileName);
    }
    async get(keyFileName) {
        const response = await this.bucket.file(keyFileName).download();
        this.keyCache[keyFileName] = response[0];
        console.log('Crypto key is retrieved from storage for:', keyFileName);
        return response[0];
    }
}
exports.default = FreeeCryptor;


/***/ }),

/***/ "./src/sdk/services/token-manager.ts":
/*!*******************************************!*\
  !*** ./src/sdk/services/token-manager.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MARGIN_OF_EXPIRES_SECONDS = 300;
class TokenManager {
    constructor(admin, oauth2, cryptor) {
        this.admin = admin;
        this.oauth2 = oauth2;
        this.cryptor = cryptor;
        this.tokenCache = {};
    }
    /**
     * Get token with handling refresh token
     */
    async get(userId) {
        let freeeToken;
        try {
            console.log(`TokenManager_get_start:`, { userId: userId });
            freeeToken = await this.getTokenFromFirebase(userId);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        if (this.tokenExpired(freeeToken)) {
            console.log(`accessToken has been expired for user:`, userId);
            try {
                return await this.refreshToken(freeeToken, userId);
            }
            catch (error) {
                if (error.output && error.output.statusCode === 401) {
                    console.log('Token is already refreshed in other instance:', error);
                    const newToken = await this.getTokenFromFirebase(userId, true);
                    if (this.tokenExpired(newToken)) {
                        console.error('Can not get available token:', error);
                        throw error;
                    }
                    return newToken.accessToken;
                }
                else {
                    throw error;
                }
            }
        }
        else {
            return freeeToken.accessToken;
        }
    }
    /**
     * Get token with handling refresh token
     */
    async save(userId, email, freeeToken) {
        const token = await this.encrypt(freeeToken);
        // Save freee token to firestore
        await this.admin
            .firestore()
            .doc(`/freeeTokens/${userId}`)
            .set(Object.assign(Object.assign({}, token), { email }));
    }
    async createCryptoKey(date) {
        if (this.cryptor) {
            await this.cryptor.createCryptoKey(date);
        }
    }
    async refreshToken(freeeToken, userId) {
        // refresh
        const tokenObject = {
            access_token: freeeToken.accessToken,
            refresh_token: freeeToken.refreshToken,
            expires_in: freeeToken.expiresIn
        };
        const accessToken = this.oauth2.accessToken.create(tokenObject);
        const newToken = await accessToken.refresh();
        // encrypt and cache
        const token = (await this.encrypt({
            accessToken: newToken.token.access_token,
            refreshToken: newToken.token.refresh_token,
            expiresIn: newToken.token.expires_in,
            createdAt: newToken.token.created_at
        }));
        this.tokenCache[userId] = token;
        // save token to firestore
        await this.admin
            .firestore()
            .doc(`/freeeTokens/${userId}`)
            .set(Object.assign({}, token), { merge: true });
        console.log('accessToken is successfully refreshed for user:', userId);
        return newToken.token.access_token;
    }
    tokenExpired(freeeToken) {
        const expiredSeconds = freeeToken.createdAt + freeeToken.expiresIn - MARGIN_OF_EXPIRES_SECONDS;
        const nowInSeconds = new Date().getTime() / 1000;
        const shouldRefresh = nowInSeconds >= expiredSeconds;
        return shouldRefresh;
    }
    async getTokenFromFirebase(userId, fromFirestore) {
        if (!fromFirestore) {
            console.log(`TokenManager_getTokenFromFirebase_fromFirestore:`, { fromFirestore: fromFirestore });
            const cachedToken = this.tokenCache[userId];
            if (cachedToken) {
                console.log(`TokenManager_getTokenFromFirebase_cachedToken:`, { cachedToken: cachedToken });
                return await this.decrypt(cachedToken);
            }
        }
        const snap = await this.admin
            .firestore()
            .doc(`/freeeTokens/${userId}`)
            .get();
        const token = snap.data();
        this.tokenCache[userId] = token;
        console.log(`TokenManager_getTokenFromFirebase_firestore:`, { firestore: token });
        console.log('Token is retrieved from firestore for user:', userId);
        return await this.decrypt(token);
    }
    async encrypt(freeeToken) {
        return this.cryptor ? await this.cryptor.encrypt(freeeToken) : freeeToken;
    }
    async decrypt(freeeToken) {
        return this.cryptor ? await this.cryptor.decrypt(freeeToken) : freeeToken;
    }
}
exports.TokenManager = TokenManager;


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("date-fns");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),

/***/ "simple-oauth2":
/*!********************************!*\
  !*** external "simple-oauth2" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("simple-oauth2");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map