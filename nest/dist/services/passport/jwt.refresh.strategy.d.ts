import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import UserService from 'services/user.service';
declare const JwtStrategyWithRefresh_base: new (...args: any[]) => Strategy;
declare class JwtStrategyWithRefresh extends JwtStrategyWithRefresh_base {
    private userService;
    constructor(userService: UserService);
    validate(request: Request, payload: any): Promise<import("../../models/entities/user").default | null>;
}
export default JwtStrategyWithRefresh;
