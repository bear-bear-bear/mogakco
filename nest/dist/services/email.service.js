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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const log_1 = require("../libs/log");
let EmailService = class EmailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    userVerify({ email, token, id }) {
        this.mailerService
            .sendMail({
            to: email,
            from: this.configService.get('EMAIL_ADMIN'),
            subject: 'Mogakco forwards Autentication to your email 🥰',
            encoding: 'utf8',
            template: path_1.join(__dirname, '/email', 'user-verify'),
            context: {
                id,
                to: email,
                verifyToken: token,
                isDev: this.configService.get('NODE_ENV') === 'development',
                port: this.configService.get('SERVER_PORT'),
            },
        })
            .then(log_1.emailSuccess)
            .catch(log_1.emailFailure);
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], EmailService);
exports.default = EmailService;
//# sourceMappingURL=email.service.js.map