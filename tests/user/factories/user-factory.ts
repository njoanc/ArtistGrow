import { faker } from "@faker-js/faker";
import { Factory, Sequence } from "@linnify/typeorm-factory";
import { UsersEntity } from "../../../src/entity/users.entity";

export class UserFactory extends Factory<UsersEntity> {
  entity = UsersEntity;

  name = new Sequence(() => faker.person.fullName());
  email = new Sequence(() => faker.internet.email());
  password = new Sequence(() => "K12345");
}

export const UserFactoryInstance = new UserFactory();
