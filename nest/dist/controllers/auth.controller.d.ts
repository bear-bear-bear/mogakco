import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import AuthService from 'services/auth.service';
import UserService from '../services/user.service';
import createUserDTO from '../models/dto/create-user.dto';
import response from './dto/response';
import LoginUserDTO from '../models/dto/login-user.dto';
import EmailService from '../services/email.service';
declare class AuthController {
    private userService;
    private authService;
    private emailService;
    constructor(userService: UserService, authService: AuthService, emailService: EmailService);
    getTest(): string;
    login(req: LoginUserDTO, res: Response): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date | undefined;
            verifiedAt?: Date | undefined;
        };
    }>;
    join(user: createUserDTO): Promise<response>;
    sendTokenBeforeRegister(email: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    processVerifyEmail({ id, token }: {
        id: string;
        token: string;
    }): Promise<{
        url: string;
    }>;
    lastCheckingBeforeRegister(email: string): Promise<{
        statusCode: number;
        message: boolean;
    }>;
    account(req: Request): Promise<{
        message: string;
        statusCode: HttpStatus;
        user: {
            id: number;
            username: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date | undefined;
            verifiedAt?: Date | undefined;
        };
    }>;
    refresh(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    requestData(req: Request): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
export default AuthController;
