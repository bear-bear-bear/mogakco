"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const jwt_guard_1 = __importDefault(require("../services/passport/jwt.guard"));
const jwt_refresh_guard_1 = __importDefault(require("../services/passport/jwt.refresh.guard"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const user_1 = __importDefault(require("../models/entities/user"));
const user_service_1 = __importDefault(require("../services/user.service"));
const create_user_dto_1 = __importDefault(require("../models/dto/create-user.dto"));
const login_exception_1 = __importDefault(require("./exception/login.exception"));
const login_user_dto_1 = __importDefault(require("../models/dto/login-user.dto"));
const email_service_1 = __importDefault(require("../services/email.service"));
const log_1 = require("../libs/log");
let AuthController = class AuthController {
    constructor(userService, authService, emailService) {
        this.userService = userService;
        this.authService = authService;
        this.emailService = emailService;
    }
    getTest() {
        return '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?';
    }
    async login(req, res) {
        const user = await this.authService.validate(req);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const { password, hashedRefreshToken } = user, props = __rest(user, ["password", "hashedRefreshToken"]);
        const { cookie: accessTokenCookie, } = this.authService.getCookieWithAccessToken(user.email);
        const { cookie: refreshTokenCookie, token, } = this.authService.getCookieWithRefreshToken(user.email);
        await this.userService.hashRefreshToken(token, user.email);
        res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return {
            message: 'Token Generated',
            user: props,
        };
    }
    async join(user) {
        const message = await this.userService.join(user);
        return message;
    }
    async sendTokenBeforeRegister(email) {
        this.authService.verifyEmailRequest(email);
        try {
            const { token, email: destinatedEmail, id, } = await this.userService.getEmailVerifyToken(email);
            this.emailService.userVerify({
                email: destinatedEmail,
                token,
                id,
            });
        }
        catch (e) {
            log_1.prepareFailure(e);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: `이메일 전송 성공`,
        };
    }
    async processVerifyEmail({ id, token }) {
        const redirection = `http://localhost:3000/signup`;
        const verification = await this.userService.verifyEmail(id, token);
        if (!verification || verification.isVerified) {
            return { url: `${redirection}?success=false` };
        }
        const { email } = verification;
        return { url: `${redirection}?email=${email}?success=true` };
    }
    async lastCheckingBeforeRegister(email) {
        if (!email) {
            throw new common_1.HttpException('이메일 인자가 없습니다.', common_1.HttpStatus.BAD_REQUEST);
        }
        const verification = await this.userService.lastCheckingEmailVerify(email);
        if (!verification) {
            throw new common_1.HttpException('인증에 실패하였습니다.', common_1.HttpStatus.UNAUTHORIZED);
        }
        return {
            statusCode: 200,
            message: verification.isVerified,
        };
    }
    async account(req) {
        const { email } = req.user;
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const { password, hashedRefreshToken } = user, props = __rest(user, ["password", "hashedRefreshToken"]);
        return {
            message: 'Authenticated',
            statusCode: common_1.HttpStatus.OK,
            user: props,
        };
    }
    async refresh(req, res) {
        const { email } = req.user;
        const { cookie: accessTokenCookie, } = this.authService.getCookieWithAccessToken(email);
        const _a = req.user, { password, hashedRefreshToken } = _a, props = __rest(_a, ["password", "hashedRefreshToken"]);
        res.setHeader('Set-Cookie', accessTokenCookie);
        return {
            message: 'Authenticated & Refreshed',
            statusCode: common_1.HttpStatus.OK,
            user: props,
        };
    }
    async logout(req, res) {
        res.setHeader('Set-Cookie', `x-token=; HttpOnly; Path=/; Max-Age=0`);
        return res.status(200).json({
            message: 'logout',
            statusCode: common_1.HttpStatus.OK,
        });
    }
    async requestData(req) {
        console.log(req.user);
        return {
            message: '1',
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    common_1.Get('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getTest", null);
__decorate([
    common_1.Post('/login'),
    common_1.UseFilters(login_exception_1.default),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "join", null);
__decorate([
    common_1.Post('/send-token/before-register'),
    common_1.HttpCode(200),
    __param(0, common_1.Body('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendTokenBeforeRegister", null);
__decorate([
    common_1.Get('/verify-email'),
    common_1.Redirect('http://localhost:3000/signup', 302),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "processVerifyEmail", null);
__decorate([
    common_1.Get('/is-verified/before-register'),
    common_1.HttpCode(200),
    __param(0, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "lastCheckingBeforeRegister", null);
__decorate([
    common_1.Post('/account'),
    common_1.UseGuards(jwt_guard_1.default),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "account", null);
__decorate([
    common_1.Post('/refresh-token'),
    common_1.UseGuards(jwt_refresh_guard_1.default),
    __param(0, common_1.Req()),
    __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    common_1.UseGuards(jwt_refresh_guard_1.default),
    common_1.Post('/logout'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    common_1.Get('/me'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestData", null);
AuthController = __decorate([
    common_1.Controller('user'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [user_service_1.default,
        auth_service_1.default,
        email_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map