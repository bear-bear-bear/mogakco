import { OmitType } from '@nestjs/swagger';
import CreateUserDto from '@authentication/dto/create-user.dto';

export default class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {}
