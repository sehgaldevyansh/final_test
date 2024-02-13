/* v8 ignore start */

declare class LoginClient {
    private exAD;
    private static gatewayUrl;
    private redirectUrlName;
    private apiKeyStorageName;
    private adStorageName;
    private lambdaUrl;
    private sendOtpPath;
    private verifyOtpPath;
    private userAttributesPath;
    private userPermissionPath;
    private userInfoPath;
    private static auth;
    private signInSession;
    private authContact;
    private secretAuthCode;
    private userExistsInCognito;
    constructor();
    init(apiKey: string, implicit?: boolean): Promise<unknown>;
    sendOtp(contactInfo: string): Promise<any>;
    verifyOtp(otp: string): Promise<any>;
    signIn(username: string, password: string): Promise<any>;
    createNewPassword(password: string): Promise<any>;
    changePassword(oldPassword: string, newPassword: string): Promise<any>;
    forgotPassword(username: string): Promise<any>;
    submitforgotPasswordOtp(username: string, code: string, newPassword: string): Promise<any>;
    signInWithFederation(redirectSignInUrl: string): void;
    getToken(): Promise<any>;
    getUserAttributes(): Promise<unknown>;
    getUserPermissions(): Promise<unknown>;
    getUserInfo(): Promise<unknown>;
    federatedLogout(client_id: string, redirect_uri: string): void;
    refreshSession(): Promise<any>;
    private sendOtpForUnregisteredUser;
    private verifyCognitoOtpChallenge;
    private verifyCustomOtpChallenge;
    private createErrorObject;
    private initPoolDetails;
    private getRandomString;
}
export declare const loginClient: LoginClient;
export {};
/* v8 ignore stop */
