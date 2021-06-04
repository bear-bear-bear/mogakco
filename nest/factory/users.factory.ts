import Faker from 'faker';
import { define } from 'typeorm-seeding';
import UserEntity from '../models/entities/user.entity';

define(UserEntity, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const user = new UserEntity();
  user.username = faker.name.lastName() + faker.name.firstName();
  user.email = faker.internet.email();
  user.password = 'junjae';
  return user;
});
