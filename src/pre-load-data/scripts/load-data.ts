import fs from "fs";
import path from "path";
import {
  EmailTemplatesConstants,
  EmailTemplatesSubject,
} from "../../constants/email-templates";
import { Logger } from "../../logger/logger";
import { EmailTemplateRepository } from "../../respositories/email-template.repository";

export class LoadData {
  emailTemplateRepository: EmailTemplateRepository;

  constructor() {
    this.emailTemplateRepository = new EmailTemplateRepository();
    this.createEmailTemplate().then(
      () => {
        Logger.info("Email templates created");
      },
      (err) => {
        Logger.error("Error while creating email templates", { err });
      }
    );
  }

  async createEmailTemplate(): Promise<void> {
    const isExists = await this.emailTemplateRepository.get(
      EmailTemplatesConstants.SIGN_UP
    );
    if (isExists) {
      Logger.info("Email template already exists");
    } else {
      await this.emailTemplateRepository.save({
        content: fs.readFileSync(
          path.join(path.resolve(__dirname, ".."), "sign-up.html"),
          "utf-8"
        ),
        name: EmailTemplatesConstants.SIGN_UP,
        subject: EmailTemplatesSubject.SIGN_UP,
      });
    }
  }
}
