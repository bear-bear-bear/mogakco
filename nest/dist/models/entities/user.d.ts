import { BaseEntity } from 'typeorm';
declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    verifiedAt?: Date;
    hashedRefreshToken?: string;
}
export default User;
