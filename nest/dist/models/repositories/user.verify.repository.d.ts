import UserVerify from 'models/entities/user.verify';
import { Repository } from 'typeorm';
declare class UserVerifyRepository extends Repository<UserVerify> {
    createOne(email: string, verifyToken: string): Promise<UserVerify>;
    findOneByEmail(id: number, email: string): Promise<UserVerify>;
}
export default UserVerifyRepository;
