import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as nodemailerMock from "nodemailer-mock";
import "reflect-metadata";
import { config } from "../../config/db";
import "../../src/db/connection";
chai.use(chaiAsPromised);

export class MailingMock {
  private transporter: nodemailerMock.NodemailerMockTransporter;

  constructor() {
    this.transporter = nodemailerMock.createTransport(config.smtp);
  }

  private async sendEmail(mailOptions: any): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.transporter.sendMail(mailOptions, (err: any, _info) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  public async sendEmailSubject(
    name: string,
    subject: string,
    content: string
  ): Promise<boolean> {
    const mailOptions = {
      from: "sender@example.com",
      to: name,
      subject: subject,
      text: content,
    };

    return this.sendEmail(mailOptions);
  }
}
export const mailingMock = new MailingMock();
