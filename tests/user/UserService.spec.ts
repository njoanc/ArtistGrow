import { faker } from "@faker-js/faker";
import { suite, test } from "@testdeck/mocha";
import bcrypt from "bcryptjs";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import * as nodemailerMock from "nodemailer-mock";
import "reflect-metadata";
import * as sinon from "sinon";
import Container from "typedi";
import { v4 as uuidv4 } from "uuid";
import { EmailTemplatesConstants } from "../../src/constants/email-templates";
import { UsersRepository } from "../../src/respositories/users.repository";
import { UsersService } from "../../src/services/users/users.service";
import { EmailUtils } from "../../src/utils/email.utils";
import { EmailFactoryInstance } from "./factories/email-template-factory";
import { UserFactoryInstance } from "./factories/user-factory";

chai.use(chaiAsPromised);

const randomId: string = uuidv4();

@suite
class UserServiceTests {
  private userService!: UsersService;
  private emailUtils: EmailUtils;
  private userRepository: UsersRepository;

  async before() {
    this.userService = Container.get(UsersService);
    this.emailUtils = Container.get(EmailUtils);
    this.userRepository = Container.get(UsersRepository);
    nodemailerMock.mock.reset();
  }

  @test
  async "should signup"() {
    const userDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    const emailDto = {
      name: EmailTemplatesConstants.SIGN_UP,
      subject: faker.word.verb(),
      content: faker.lorem.paragraph(),
    };

    const emailTemplate = await EmailFactoryInstance.create(emailDto);

    const result = await this.userService.signUp(userDto);

    sinon.stub(this.emailUtils, "send").resolves(emailTemplate.name);

    expect(result.email).to.equal(userDto.email);
    expect(result.name).to.equal(userDto.name);
  }

  @test
  async "should throw an error if a user already exists"() {
    const userDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.lorem.word(), 10),
    };

    await UserFactoryInstance.create(userDto);

    const result = this.userService.signUp(userDto);

    await expect(result).to.be.rejectedWith("User already exists");
  }

  @test
  async "should login"() {
    const userDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("K12345", 10),
    };

    const user = { email: userDto.email, password: "K12345" };

    await UserFactoryInstance.create(userDto);

    const result: any = await this.userService.login(user as any);

    expect(result.user.email).to.equal(userDto.email);
    expect(result.user.name).to.equal(userDto.name);
    expect(result.token).to.be.a("string").with.length.greaterThan(10);
  }

  @test
  async "should reject with an error if passwords don't match"() {
    const userDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("K12345", 10),
    };

    const user = { email: userDto.email, password: "K1234895" };

    await UserFactoryInstance.create(userDto);

    const result: any = this.userService.login(user as any);
    await expect(result).to.be.rejectedWith("User details does not match");
  }
}
