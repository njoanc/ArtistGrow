import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import winston from "winston";
import { EmailTemplateRepository } from "../respositories/email-template.repository";
export declare class EmailUtils {
    transporter: nodemailer.Transporter;
    logger: winston.Logger;
    emailTemplateRepository: EmailTemplateRepository;
    constructor();
    /**
     * @function
     * @param templateName
     * @param options
     * @param placeholders
     * @returns
     */
    send(templateName: string, options: Mail.Options, placeholders: any): Promise<any>;
}
//# sourceMappingURL=email.utils.d.ts.map