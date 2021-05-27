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
const user_verify_1 = __importDefault(require("../entities/user.verify"));
const typeorm_1 = require("typeorm");
let UserVerifyRepository = class UserVerifyRepository extends typeorm_1.Repository {
    async createOne(email, verifyToken) {
        const userVerify = new user_verify_1.default();
        userVerify.token = verifyToken;
        userVerify.expiredAt = new Date(Date.now() + 1000 * 60 * 30);
        userVerify.email = email;
        await userVerify.save();
        return userVerify;
    }
    async findOneByEmail(id, email) {
        const userVerify = await this.findOne({ id, email });
        if (!userVerify)
            throw new Error('');
        return userVerify;
    }
};
UserVerifyRepository = __decorate([
    typeorm_1.EntityRepository(user_verify_1.default)
], UserVerifyRepository);
exports.default = UserVerifyRepository;
//# sourceMappingURL=user.verify.repository.js.map