import ejs from "ejs";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Service } from "typedi";
import { config } from "../../config/db";
import { HTTP_CODES } from "../constants/http-codes";
import { CustomError } from "../error/custom.error";
import { Logger } from "../logger/logger";
import { EmailTemplateRepository } from "../respositories/email-template.repository";

@Service()
export class EmailUtils {
  transporter: nodemailer.Transporter;
  emailTemplateRepository: EmailTemplateRepository;

  constructor() {
    let options: any = config.smtp;
    const emailOptions = JSON.parse(JSON.stringify(options));
    this.transporter = nodemailer.createTransport(emailOptions);
    this.transporter.on("error", (error) => {
      Logger.error("Email transport failed to initialize", { error });
    });
    this.emailTemplateRepository = new EmailTemplateRepository();
  }

  /**
   * @function
   * @param templateName
   * @param options
   * @param placeholders
   * @returns
   */
  async send(
    templateName: string,
    options: Mail.Options,
    placeholders: any
  ): Promise<any> {
    const template = await this.emailTemplateRepository.get(templateName);

    if (!template) {
      throw new CustomError("Email template not found", HTTP_CODES.NOT_FOUND);
    }
    const html = ejs.render(template.content, placeholders);
    options.html = html;
    options.subject = template.subject;
    const result = await this.transporter.sendMail(options);
    Logger.info("EmailUtils:send: Email send ", { result });
    return result;
  }
}
