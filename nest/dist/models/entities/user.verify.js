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
const typeorm_1 = require("typeorm");
let UserVerify = class UserVerify extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserVerify.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], UserVerify.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserVerify.prototype, "token", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserVerify.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: 'expired_at' }),
    __metadata("design:type", Date)
], UserVerify.prototype, "expiredAt", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_verified', default: false }),
    __metadata("design:type", Boolean)
], UserVerify.prototype, "isVerified", void 0);
UserVerify = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['id'])
], UserVerify);
exports.default = UserVerify;
//# sourceMappingURL=user.verify.js.map