import Faker from 'faker';
import { define } from 'typeorm-seeding';
import UserEntity from '@models/user/entities/user.entity';

define(UserEntity, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const user = new UserEntity();
  user.username = faker.name.lastName() + faker.name.firstName();
  faker.locale = 'en';
  user.email = faker.name.lastName() + faker.internet.email();
  user.password = 'junjae';
  return user;
});
