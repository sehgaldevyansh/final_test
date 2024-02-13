/* v8 ignore start */
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Amplify = exports.loginClient = void 0;
const login_client_js_1 = require("./login-client.js");
Object.defineProperty(exports, "loginClient", { enumerable: true, get: function () { return login_client_js_1.loginClient; } });
const aws_amplify_1 = __importStar(require("aws-amplify"));
exports.Amplify = aws_amplify_1.default;
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return aws_amplify_1.Auth; } });
/* v8 ignore stop */
