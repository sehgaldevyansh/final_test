/* v8 ignore start */

import Amplify, { Auth } from 'aws-amplify';
class LoginClient {
    constructor() {
        this.exAD = false;
        this.redirectUrlName = 'redirect_uri';
        this.apiKeyStorageName = 'msil-common-login-sdk-api-key';
        this.adStorageName = 'last-used-ad';
        this.lambdaUrl = 'https://www.cf.marutisuzukisubscribe.com/api/partner/v1/sdk-details?apiKey=';
        this.sendOtpPath = 'api/partner/otp/register/send';
        this.verifyOtpPath = 'api/partner/otp/verify';
        this.userAttributesPath = 'api/common/composite/partner/attributes';
        this.userPermissionPath = '/api/common/composite/auth/user/permission/screen';
        this.userInfoPath = '/api/common/composite/auth/users';
        this.userExistsInCognito = false;
        this.secretAuthCode = '';
        this.authContact = '';
        const url = document.URL;
        const adName = window.localStorage.getItem(this.adStorageName);
        const key = window.localStorage.getItem(this.apiKeyStorageName);
        if (key) {
            this.init(key, true);
        }
    }
    init(apiKey, implicit) {
        const url = this.lambdaUrl + apiKey;
        if (window && window.localStorage) {
            window.localStorage.setItem(this.apiKeyStorageName, apiKey);
        }
        return new Promise((resolve, reject) => {
            fetch(url).then((env_data) => {
                env_data.json().then(data => {
                    this.initPoolDetails(data, implicit);
                    Amplify.configure({ Auth: LoginClient.auth });
                    Auth.configure({ Auth: LoginClient.auth });
                    resolve(true);
                });
            }, (env_data_error) => {
                reject(env_data_error);
            });
        });
    }
    sendOtp(contactInfo) {
        this.authContact = contactInfo;
        return new Promise((resolve, reject) => {
            Auth.signIn(contactInfo).then((data) => {
                this.signInSession = data;
                this.userExistsInCognito = true;
                resolve({
                    status: 'OTP_SENT_SUCCESS',
                    source: 'COGNITO'
                });
            }, (error) => {
                if (error && error.code === 'UserLambdaValidationException' && error.message.includes('USERNOTFOUND')) {
                    this.userExistsInCognito = false;
                    this.sendOtpForUnregisteredUser(contactInfo, resolve, reject);
                }
                else {
                    if (error.message) {
                        const messageChunks = error.message.split('##');
                        reject({
                            errorCode: messageChunks[1],
                            errorMessage: messageChunks[2]
                        });
                    }
                }
            });
        });
    }
    verifyOtp(otp) {
        this.secretAuthCode = otp;
        if (this.userExistsInCognito) {
            return this.verifyCognitoOtpChallenge(otp);
        }
        else {
            return this.verifyCustomOtpChallenge(otp, this.authContact);
        }
    }
    signIn(username, password) {
        return new Promise((resolve, reject) => {
            Auth.signIn(username, password).then((data) => {
                if (data.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    this.signInSession = data;
                    resolve({
                        auth_status: data.challengeName,
                        data: data
                    });
                }
                else {
                    resolve({
                        auth_status: 'TOKEN_RECEIVED',
                        data: data
                    });
                }
            }, (error) => {
                reject(error);
            });
        });
    }
    createNewPassword(password) {
        return new Promise((resolve, reject) => {
            Auth.completeNewPassword(this.signInSession, password).then((data) => {
                resolve({
                    auth_status: 'TOKEN_RECEIVED',
                    data: data
                });
            }, (error) => {
                reject(error);
            });
        });
    }
    changePassword(oldPassword, newPassword) {
        return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser()
                .then(user => {
                Auth.changePassword(user, oldPassword, newPassword).then(data => {
                    resolve({
                        auth_status: 'PASSWORD_CHANGED_SUCCESS',
                        data
                    });
                }, (error) => {
                    reject(error);
                });
            }, (error) => {
                reject(error);
            });
        });
    }
    forgotPassword(username) {
        return new Promise((resolve, reject) => {
            Auth.forgotPassword(username)
                .then(data => {
                resolve({
                    auth_status: 'FORGOT_PWD_OTP_REQUIRED',
                    data
                });
            }, (error) => {
                reject(error);
            });
        });
    }
    submitforgotPasswordOtp(username, code, newPassword) {
        return new Promise((resolve, reject) => {
            Auth.forgotPasswordSubmit(username, code, newPassword)
                .then(data => {
                resolve({
                    auth_status: 'PASSWORD_RESET_SUCCESS',
                    data
                });
            }, (error) => {
                reject(error);
            });
        });
    }
    signInWithFederation(redirectSignInUrl) {
        // window.localStorage.setItem(this.adStorageName, 'MSIL-AD');
        const key = window.localStorage.getItem(this.apiKeyStorageName);
        if (key) {
            this.init(key, true);
        }
        window.localStorage.setItem(this.redirectUrlName, redirectSignInUrl);
        if (!redirectSignInUrl.startsWith('http')) {
            throw new Error('Invalid redirect URL detected. The redirect URL must be a HTTPS protocol URL.');
        }
        const state = this.getRandomString();
        const authorizationServerUrl = `https://${LoginClient.auth.oauth.domain}/oauth2/authorize?identity_provider=${LoginClient.auth.federationDomain}&response_type=CODE&state=${state}&client_id=${LoginClient.auth.userPoolWebClientId}&redirect_uri=${redirectSignInUrl}&scope=${LoginClient.auth.oauth.scope.join(" ")}`;
        location.href = authorizationServerUrl;
    }
    getToken() {
        const data = {};
        if (window && window.localStorage) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    Auth.currentAuthenticatedUser().then((authUser) => {
                        data.attributes = authUser.attributes;
                        data.session = authUser.signInUserSession;
                        data.username = authUser.username;
                        resolve({
                            auth_status: 'TOKEN_RECEIVED',
                            data
                        });
                    }, (error) => {
                        reject({
                            errorCode: 'INVALID.SESSION',
                            errorMessage: 'No valid user session found. Try with a new login.'
                        });
                    });
                }, 1000);
            });
        }
        throw new Error('Invalid Device: No Local Storage detected. Perhaps you are running it on an outdated browser.');
    }
    getUserAttributes() {
        let url;
        let token;
        return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser().then((authUser) => {
                const username = authUser.username;
                url = `${LoginClient.gatewayUrl}${this.userAttributesPath}?userId=${username}`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json;',
                        'Authorization': authUser.signInUserSession.idToken.jwtToken
                    }
                }).then((attributes_data) => {
                    attributes_data.json().then(data => {
                        if (!data.error) {
                            resolve(data);
                        }
                        else {
                            const errorObj = this.createErrorObject(data);
                            reject(errorObj);
                        }
                    });
                }, (attributes_error) => {
                    reject(attributes_error);
                });
            });
        });
    }
    getUserPermissions() {
        let url;
        let token;
        return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser().then((authUser) => {
                url = `${LoginClient.gatewayUrl}${this.userPermissionPath}`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json;',
                        'Authorization': authUser.signInUserSession.idToken.jwtToken
                    }
                }).then((permission_data) => {
                    permission_data.json().then(data => {
                        if (!data.error) {
                            resolve(data);
                        }
                        else {
                            const errorObj = this.createErrorObject(data);
                            reject(errorObj);
                        }
                    });
                }, (permission_error) => {
                    reject(permission_error);
                });
            });
        });
    }
    getUserInfo() {
        let url;
        return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser().then((authUser) => {
                url = `${LoginClient.gatewayUrl}${this.userInfoPath}/${authUser.username}`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json;',
                        'Authorization': authUser.signInUserSession.idToken.jwtToken
                    }
                }).then((user_data) => {
                    user_data.json().then(data => {
                        if (!data.error) {
                            resolve(data);
                        }
                        else {
                            const errorObj = this.createErrorObject(data);
                            reject(errorObj);
                        }
                    });
                }, (user_error) => {
                    reject(user_error);
                });
            });
        });
    }
    federatedLogout(client_id, redirect_uri) {
        if (window && window.localStorage) {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('CognitoIdentityServiceProvider'));
            keys.forEach(k => localStorage.removeItem(k));
        }
        const logoutUrl = `https://${LoginClient.auth.oauth.domain}/logout?client_id=${client_id}&logout_uri=${redirect_uri}`;
        location.href = logoutUrl;
    }
    refreshSession() {
        return new Promise((resolve, reject) => {
            try {
                Auth.currentAuthenticatedUser().then((user) => {
                    Auth.currentSession().then(currentSession => {
                        user.refreshSession(currentSession.getRefreshToken(), (err, session) => {
                            resolve(session);
                        });
                    });
                });
            }
            catch (error) {
                console.error('Unable to refresh Token. Please try a new login', error);
                reject({
                    errorCode: 'SESSION.RECOVERY.FAILED',
                    errorMessage: 'Error while refreshing session. Try with a new login.'
                });
            }
        });
    }
    sendOtpForUnregisteredUser(contactInfo, resolve, reject) {
        const otp_body = {
            mspin: contactInfo,
            appClientId: LoginClient.auth.userPoolWebClientId
        };
        const url = LoginClient.gatewayUrl + this.sendOtpPath;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(otp_body),
            headers: {
                'Content-type': 'application/json;'
            }
        }).then((otp_sent_data) => {
            otp_sent_data.json().then(data => {
                if (!data.error) {
                    resolve({
                        status: 'OTP_SENT_SUCCESS',
                        source: 'CUSTOM'
                    });
                }
                else {
                    const errorObj = this.createErrorObject(data);
                    reject(errorObj);
                }
            });
        }, (otp_sent_error) => {
            reject(otp_sent_error);
        });
    }
    verifyCognitoOtpChallenge(otp) {
        return new Promise((resolve, reject) => {
            const cognitoSession = Auth.sendCustomChallengeAnswer(this.signInSession, otp).then((data) => {
                if (data.Session) {
                    reject({
                        errorCode: 'INCORRECT_OTP',
                        errorMessage: 'The OTP you entered was incorrect. Please try again.'
                    });
                }
                else if (data.signInUserSession) {
                    resolve({
                        otp_status: 'OTP_VERIFIED',
                        auth_status: 'Token Received',
                        data: data
                    });
                }
            }, (error) => {
                if (error && error.code === 'UserLambdaValidationException' && error.message) {
                    const messageChunks = error.message.split('##');
                    reject({
                        errorCode: messageChunks[1],
                        errorMessage: messageChunks[2]
                    });
                }
                else if (error && error.code === 'NotAuthorizedException' && error.message) {
                    reject({
                        errorCode: 'GENERATE.NEW.OTP',
                        errorMessage: 'Please generate new OTP.'
                    });
                }
            });
        });
    }
    verifyCustomOtpChallenge(otp, contactInfo) {
        return new Promise((resolve, reject) => {
            const verify_otp_body = {
                otp,
                contactInfo
            };
            const url = LoginClient.gatewayUrl + this.verifyOtpPath;
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(verify_otp_body),
                headers: {
                    'Content-type': 'application/json;'
                }
            }).then((otp_verify_data) => {
                otp_verify_data.json().then(data => {
                    if (!data.error) {
                        Auth.signIn(this.authContact).then((data) => {
                            Auth.sendCustomChallengeAnswer(data, this.secretAuthCode).then((data) => {
                                resolve({
                                    otp_status: 'OTP_VERIFIED',
                                    auth_status: 'TOKEN_RECEIVED',
                                    data: data
                                });
                            }, (error) => {
                                reject(error);
                            });
                        }, (error) => {
                            reject(error);
                        });
                    }
                    else {
                        const errorObj = this.createErrorObject(data);
                        reject(errorObj);
                    }
                });
            }, (otp_verify_error) => {
                reject(otp_verify_error);
            });
        });
    }
    createErrorObject(errorObj) {
        if (errorObj.errors && errorObj.errors.length > 0) {
            return {
                errorCode: errorObj.errors[0].errorCode,
                errorMessage: errorObj.errors[0].errorMessage
            };
        }
        return {
            errorCode: 'UNEXPECTED.TECHNICAL.FAILURE',
            errorMessage: `An unexpected error occured during login.`
        };
    }
    initPoolDetails(data, implicit) {
        LoginClient.auth = {
            region: data.region,
            userPoolId: data.userPoolId,
            userPoolWebClientId: data.userPoolWebClientId,
            authenticationFlowType: data.authenticationFlowType || 'CUSTOM_AUTH',
            federationDomain: data.domain,
            oauth: {
                domain: data.authServer,
                scope: ['email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
                responseType: 'code'
            }
        };
        LoginClient.gatewayUrl = data.gatewayUrl;
        // Amplify throw error if redirect sign in is not set and federated login is used
        if (implicit && window && window.localStorage) {
            const redirectUrl = window.localStorage.getItem(this.redirectUrlName);
            if (redirectUrl) {
                LoginClient.auth.oauth.redirectSignIn = redirectUrl;
            }
            else {
                console.warn('Redirect URL could not be validated. Make sure you do not clear the storage at init if you are using federated login');
            }
        }
    }
    //Generate a Random String
    getRandomString() {
        const randomItems = new Uint32Array(28);
        crypto.getRandomValues(randomItems);
        const binaryStringItems = randomItems.map(dec => Number(`0${dec.toString(16).substr(-2)}`));
        return binaryStringItems.reduce((acc, item) => `${acc}${item}`, '');
    }
}
export const loginClient = new LoginClient();
/* v8 ignore stop */
