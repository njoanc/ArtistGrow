import { EmailTemplatesDTO } from "../dto/email-template.dto";
import { EmailTemplatesEntity } from "../entity/email-template.entity";
export declare class EmailTemplateRepository {
    get(templateName: string): Promise<EmailTemplatesEntity | undefined>;
    save(template: EmailTemplatesDTO): Promise<EmailTemplatesEntity>;
}
//# sourceMappingURL=email-template.repository.d.ts.map