import User from '@models/entities/user';
import UserRepository from '../models/repositories/user.repository';
import UserVerifyRepository from '../models/repositories/user.verify.repository';
import createUserDTO from '../models/dto/create-user.dto';
import UserVerify from '@models/entities/user.verify';
declare class UserService {
    private userRepository;
    private userVerifyRepository;
    constructor(userRepository: UserRepository, userVerifyRepository: UserVerifyRepository);
    verifyTokenBeforeRegister(email: string): Promise<boolean | undefined>;
    getEmailVerifyToken(email: string): Promise<{
        token: string;
        email: string;
        id: number;
    }>;
    lastCheckingEmailVerify(email: string): Promise<false | UserVerify>;
    verifyEmail(id: string, token: string): Promise<false | UserVerify>;
    findUserOne(id: number): Promise<User>;
    findUserByName(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUserOne(user: any): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").UpdateResult>;
    join({ username, password, email }: createUserDTO): Promise<{
        message: string;
        statusCode: number;
    }>;
    hashRefreshToken(refreshToken: string, email: string): Promise<import("typeorm").UpdateResult>;
    getUserIfTokenMatches(refreshToken: string, email: string): Promise<User | null>;
    verifyUserWithToken(id: number, verifyToken: string): Promise<boolean>;
}
export default UserService;
