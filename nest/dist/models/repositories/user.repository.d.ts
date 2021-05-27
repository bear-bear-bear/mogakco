import { Repository } from 'typeorm';
import User from '../entities/user';
import createUserDTO from '../dto/create-user.dto';
declare class UserRepository extends Repository<User> {
    createUserOne(user: createUserDTO): Promise<User>;
    findUserOne(id: number): Promise<User>;
    findUserByName(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(user: any): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").UpdateResult>;
}
export default UserRepository;
