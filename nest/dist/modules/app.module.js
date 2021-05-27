"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const joi_1 = __importDefault(require("joi"));
const user_verify_1 = __importDefault(require("../models/entities/user.verify"));
const user_1 = __importDefault(require("../models/entities/user"));
const auth_module_1 = __importDefault(require("./auth.module"));
const mail_module_1 = __importDefault(require("./mail.module"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
                validationSchema: joi_1.default.object({
                    NODE_ENV: joi_1.default.string()
                        .valid('development', 'test', 'production')
                        .required(),
                    DATABASE_NAME: joi_1.default.string().required(),
                    DATABASE_USER: joi_1.default.string().required(),
                    DATABASE_PASSWORD: joi_1.default.string().required(),
                    DATABASE_HOST: joi_1.default.string().required(),
                    DATABASE_PORT: joi_1.default.number().required(),
                    SERVER_PORT: joi_1.default.number().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT, 10),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                synchronize: process.env.NODE_ENV === 'development',
                logging: process.env.NODE_ENV === 'development',
                entities: [user_1.default, user_verify_1.default],
            }),
            auth_module_1.default,
            mail_module_1.default,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map