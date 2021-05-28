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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const login_user_dto_1 = __importDefault(require("../models/dto/login-user.dto"));
const user_service_1 = __importDefault(require("./user.service"));
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findUserByEmail(email);
        if (!user)
            throw new common_1.BadRequestException();
        const hash = await bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!hash && !user) {
            return new common_1.HttpException('아이디 또는 비밀번호가 틀렸습니다.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user && hash) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async validate(loginUserDTO) {
        const { email, password } = loginUserDTO;
        const user = await this.userService.findUserByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException();
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException();
        return user;
    }
    getCookieWithAccessToken(email) {
        const payload = { email };
        const token = this.jwtService.sign(payload, {
            secret: 'ACCESS_TOKEN_!@#',
            expiresIn: '10m',
        });
        const cookie = `x-token=${token}; HttpOnly; Path=/; Max-Age=${10 * 60}`;
        return { cookie };
    }
    getCookieWithRefreshToken(email) {
        const payload = { email };
        const token = this.jwtService.sign(payload, {
            secret: 'REFRESH_TOKEN_!@#',
            expiresIn: '7d',
        });
        const cookie = `refresh-token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
        return {
            cookie,
            token,
        };
    }
    verifyEmailRequest(email) {
        if (!email) {
            throw new common_1.HttpException('이메일 필드가 존재하지 않습니다.', common_1.HttpStatus.BAD_REQUEST);
        }
        const isEmpty = email.trim() === '';
        const matcher = email.match(/\w+@\w+.\w{3}/);
        if (isEmpty || matcher === null) {
            throw new common_1.HttpException('이메일 형식이 아닙니다.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.default,
        jwt_1.JwtService])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map