import { BaseEntity } from 'typeorm';
declare class UserVerify extends BaseEntity {
    id: number;
    email: string;
    token: string;
    createdAt: Date;
    expiredAt: Date;
    isVerified: boolean;
}
export default UserVerify;
