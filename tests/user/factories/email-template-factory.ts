import { faker } from "@faker-js/faker";
import { Factory, Sequence } from "@linnify/typeorm-factory";
import { EmailTemplatesEntity } from "../../../src/entity/email-template.entity";

export class EmailFactory extends Factory<EmailTemplatesEntity> {
  entity = EmailTemplatesEntity;

  name = new Sequence(() => faker.person.fullName());
  subject = new Sequence(() => faker.word.verb());
  content = new Sequence(() => faker.lorem.paragraph());
}

export const EmailFactoryInstance = new EmailFactory();
