import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { fieldDataLength } from './users-field.factory';
import UserEntity from '../models/entities/user.entity';
import { getRandomCount } from './helper/utils';

define(UserEntity, (faker: typeof Faker) => {
  const fieldIndexArray = Array(fieldDataLength).map((_, index) => String(index));
  const skillCount = getRandomCount(fieldDataLength);

  const user = new UserEntity();
  user.username = faker.name.lastName();
  user.createdAt = new Date();
  user.email = faker.internet.email();
  user.updatedAt = new Date();
  user.skills = Array(skillCount)
    .fill(0)
    .map(() => fieldIndexArray[getRandomCount(fieldDataLength)]);

  return user;
});
