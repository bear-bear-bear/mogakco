import { JwtService } from '@nestjs/jwt';
import LoginUserDTO from '@models/dto/login-user.dto';
import UserService from './user.service';
declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    validate(loginUserDTO: LoginUserDTO): Promise<import("../models/entities/user").default>;
    getCookieWithAccessToken(email: string): {
        cookie: string;
    };
    getCookieWithRefreshToken(email: string): {
        cookie: string;
        token: string;
    };
    verifyEmailRequest(email: string | undefined): void;
}
export default AuthService;
