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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_1 = __importDefault(require("../models/entities/user"));
const uuid_1 = require("uuid");
const user_repository_1 = __importDefault(require("../models/repositories/user.repository"));
const user_verify_repository_1 = __importDefault(require("../models/repositories/user.verify.repository"));
const makeHash_1 = __importDefault(require("../lib/makeHash"));
const user_verify_1 = __importDefault(require("../models/entities/user.verify"));
let UserService = class UserService {
    constructor(userRepository, userVerifyRepository) {
        this.userRepository = userRepository;
        this.userVerifyRepository = userVerifyRepository;
    }
    async verifyTokenBeforeRegister(email) {
        const currentVerification = await this.userVerifyRepository.findOne({
            email,
        });
        return currentVerification === null || currentVerification === void 0 ? void 0 : currentVerification.isVerified;
    }
    async getEmailVerifyToken(email) {
        const now = new Date();
        const currentVerification = await this.userVerifyRepository.findOne({
            email,
        });
        if (currentVerification === null || currentVerification === void 0 ? void 0 : currentVerification.expiredAt) {
            const { expiredAt, id, token } = currentVerification;
            if (expiredAt < now)
                await this.userVerifyRepository.delete(id);
            if (expiredAt > now) {
                return {
                    token,
                    email,
                    id,
                };
            }
        }
        const newVerificationToken = await makeHash_1.default(`${email}|${uuid_1.v4()}`);
        const { token, id } = await this.userVerifyRepository.createOne(email, newVerificationToken);
        return { token, email, id };
    }
    async lastCheckingEmailVerify(email) {
        const verificationInstance = await this.userVerifyRepository.findOne({
            email,
        });
        if (!verificationInstance) {
            return false;
        }
        return verificationInstance;
    }
    async verifyEmail(id, token) {
        const record = (await this.userVerifyRepository.findOne(id));
        if (!record) {
            throw new common_1.HttpException('인증 url 이 잘못되었습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (record.isVerified)
            return record;
        if (record.expiredAt < new Date())
            return false;
        const isEqual = token === record.token;
        if (isEqual)
            record.isVerified = true;
        if (!isEqual)
            record.isVerified = false;
        await record.save();
        return record;
    }
    async findUserOne(id) {
        return this.userRepository.findUserOne(id);
    }
    async findUserByName(username) {
        return this.userRepository.findUserByName(username);
    }
    async findUserByEmail(email) {
        return this.userRepository.findUserByEmail(email);
    }
    async updateUserOne(user) {
        return this.userRepository.updateUser(user);
    }
    async deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
    async join({ username, password, email }) {
        const currentUser = await this.userRepository.findUserByEmail(email);
        if (currentUser) {
            throw new common_1.HttpException('이미 존재하는 유저입니다.', common_1.HttpStatus.UNAUTHORIZED);
        }
        const hashedPassword = await makeHash_1.default(password);
        await this.userRepository.createUserOne({
            username,
            password: hashedPassword,
            email,
        });
        return { message: '유저가 생성되었습니다.', statusCode: 201 };
    }
    async hashRefreshToken(refreshToken, email) {
        const hashedToken = await bcrypt.hash(refreshToken, 12);
        const isSaved = await this.userRepository.update({ email }, {
            hashedRefreshToken: hashedToken,
        });
        return isSaved;
    }
    async getUserIfTokenMatches(refreshToken, email) {
        const user = await this.userRepository.findOne({ email });
        if (user && user.hashedRefreshToken) {
            const isMatch = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
            if (isMatch) {
                return user;
            }
        }
        return null;
    }
    async verifyUserWithToken(id, verifyToken) {
        const userVerify = await this.userVerifyRepository.findOne({ id });
        if (!userVerify) {
            throw new common_1.InternalServerErrorException();
        }
        const isMatch = await bcrypt.compare(verifyToken, userVerify.token);
        if (!isMatch) {
            throw new common_1.UnauthorizedException();
        }
        if (userVerify.expiredAt < new Date()) {
            throw new common_1.UnauthorizedException('The verify token was expired.');
        }
        const [userId] = verifyToken.split('|');
        const user = await this.findUserOne(parseInt(userId, 10));
        if (!user && typeof user === 'boolean') {
            return false;
        }
        user.verifiedAt = new Date();
        await user.save();
        return true;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.default)),
    __param(0, typeorm_1.InjectRepository(user_verify_repository_1.default)),
    __metadata("design:paramtypes", [user_repository_1.default,
        user_verify_repository_1.default])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map