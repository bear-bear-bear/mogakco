import { ApiProperty, OmitType } from '@nestjs/swagger';
import CreateUserDto from '@authentication/dto/create-user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
  @ApiProperty({ description: '아이디' })
  @IsNotEmpty({ message: '빈 값이 올 수 없습니다.' })
  @IsNumber()
  id!: number;
}
