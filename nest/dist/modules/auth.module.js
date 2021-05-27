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
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = __importDefault(require("../services/passport/jwt.strategy"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const jwt_refresh_strategy_1 = __importDefault(require("../services/passport/jwt.refresh.strategy"));
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = __importDefault(require("./user.module"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const email_service_1 = __importDefault(require("../services/email.service"));
const user_verify_repository_1 = __importDefault(require("../models/repositories/user.verify.repository"));
const user_repository_1 = __importDefault(require("../models/repositories/user.repository"));
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_verify_repository_1.default, user_repository_1.default]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            jwt_1.JwtModule.register({}),
            user_module_1.default,
        ],
        controllers: [auth_controller_1.default],
        providers: [auth_service_1.default, jwt_strategy_1.default, jwt_refresh_strategy_1.default, email_service_1.default],
        exports: [jwt_strategy_1.default, jwt_refresh_strategy_1.default, passport_1.PassportModule],
    })
], AuthModule);
exports.default = AuthModule;
//# sourceMappingURL=auth.module.js.map