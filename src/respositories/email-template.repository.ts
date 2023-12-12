import { Service } from "typedi";
import { getRepository } from "typeorm";
import { EmailTemplatesDTO } from "../dto/email-template.dto";
import { EmailTemplatesEntity } from "../entity/email-template.entity";

@Service()
export class EmailTemplateRepository {
  async get(templateName: string): Promise<EmailTemplatesEntity | undefined> {
    const result = await getRepository(EmailTemplatesEntity).findOne({
      where: { name: templateName },
    });

    return result;
  }

  async save(template: EmailTemplatesDTO) {
    const result = await getRepository(EmailTemplatesEntity).save(
      <EmailTemplatesEntity>template
    );
    return result;
  }
}
