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
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_1 = __importDefault(require("../entities/user"));
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async createUserOne(user) {
        const newUser = new user_1.default();
        newUser.password = user.password;
        newUser.username = user.username;
        newUser.email = user.email;
        await this.save(newUser);
        return newUser;
    }
    async findUserOne(id) {
        const user = await this.findOne({ id });
        if (!user) {
            throw new common_1.InternalServerErrorException();
        }
        return user;
    }
    async findUserByName(username) {
        const user = await this.findOne({
            where: { username },
            select: ['id', 'username', 'password', 'email'],
        });
        if (!user) {
            throw new common_1.InternalServerErrorException();
        }
        return user;
    }
    async findUserByEmail(email) {
        const user = await this.findOne({ email });
        if (!user) {
            return null;
        }
        return user;
    }
    async updateUser(user) {
        const updatedUser = await this.save(user);
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException();
        }
        return updatedUser;
    }
    async deleteUser(id) {
        return this.softDelete(id);
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_1.default)
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map