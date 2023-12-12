import { EmailTemplateRepository } from "../../respositories/email-template.repository";
import winston from "winston";
export declare class LoadData {
    emailTemplateRepository: EmailTemplateRepository;
    logger: winston.Logger;
    constructor();
    createEmailTemplate(): Promise<void>;
}
//# sourceMappingURL=load-data.d.ts.map