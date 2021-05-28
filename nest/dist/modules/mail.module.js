"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
let MailModule = class MailModule {
};
MailModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule.forRoot()],
                useFactory: async () => ({
                    transport: {
                        service: process.env.EMAIL_SERVICE_NAME,
                        host: process.env.EMAIL_HOST,
                        port: parseInt(process.env.EMAIL_SERVICE_PORT, 10),
                        secure: process.env.NODE_ENV === 'production',
                        auth: {
                            type: 'login',
                            user: process.env.EMAIL_ADMIN,
                            pass: process.env.EMAIL_PASSWORD,
                        },
                    },
                    template: {
                        dir: path_1.join(__dirname, '../services/email'),
                        adapter: new pug_adapter_1.PugAdapter(),
                    },
                }),
            }),
        ],
        providers: [],
        exports: [],
    })
], MailModule);
exports.default = MailModule;
//# sourceMappingURL=mail.module.js.map