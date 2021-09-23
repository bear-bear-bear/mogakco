import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export default class AnonymousPropDto {
  @ApiProperty({ description: '이름' })
  @IsString({ message: '문자열이 아닙니다.' })
  @MinLength(2, { message: '이름의 길이가 너무 작습니다.' })
  @MaxLength(10, { message: '이름의 길이가 너무 큽니다.' })
  readonly name!: string;
}
