import { define } from 'typeorm-seeding';
import UserFieldEntity from '@models/user/entities/user-field.entity';

export const fieldData = [
  '프론트엔드',
  '백엔드',
  '풀스택',
  '임베디드',
  '컴파일러',
  '게임 클라이언트',
  '게임 서버',
  '데브옵스(엔지니어링)',
  '정보보안',
  '알고리즘',
  '안드로이드',
  'IOS',
  '운영체제',
  '리눅스',
];

export const fieldDataLength = fieldData.length;

define(UserFieldEntity, () => {
  const field = new UserFieldEntity();

  if (fieldData.length === 0) {
    return null;
  }

  const arrayIndex = Math.floor(Math.random() * fieldData.length);
  const name = fieldData[arrayIndex];
  fieldData.splice(arrayIndex, 1);
  field.name = name;
  field.createdAt = new Date();
  field.updatedAt = new Date();
  return field;
});
