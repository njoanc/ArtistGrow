import { Service } from "typedi";
import { EmailTemplatesConstants } from "../../constants/email-templates";
import { HTTP_CODES } from "../../constants/http-codes";
import { UsersDTO } from "../../dto/users.dto";
import { CustomError } from "../../error/custom.error";
import { UsersRepository } from "../../respositories/users.repository";
import { EmailUtils } from "../../utils/email.utils";
import { JWTUtils } from "../../utils/jwt-utils";
import { PasswordUtils } from "../../utils/password.utils";

@Service()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private passwordUtils: PasswordUtils,
    private emailUtils: EmailUtils,
    private jwtUtils: JWTUtils
  ) {}

  /**
   * @function
   * @name getByEmail
   * @returns
   */
  async getByEmail(email: string) {
    const result = await this.usersRepository.getByEmail(email, [
      "id",
      "name",
      "email",
    ]);

    return result;
  }

  /**
   * @function
   * @name get
   * @returns
   */
  async get() {
    const result = await this.usersRepository.get();

    return result;
  }

  /**
   * @function
   * @name save
   * @param data
   * @returns
   */
  async signUp(data: UsersDTO) {
    const user = await this.usersRepository.getByEmail(data.email, [
      "id",
      "email",
      "name",
    ]);

    if (user) {
      throw new CustomError("User already exists", HTTP_CODES.CONFLICT);
    }
    if (!data.password) {
      // Variable length of password per user
      data.password = this.passwordUtils.generate(
        data.email.split("@")[0].length
      );
    }
    const password = data.password;
    data.password = await this.passwordUtils.hashPassword(data.password);
    const result = await this.usersRepository.signUp(data);
    if (result) {
      await this.emailUtils.send(
        EmailTemplatesConstants.SIGN_UP,
        { to: result.email },
        Object.assign({
          password,
          appName: "artistGrow",
          userName: result.email,
          name: result.name,
        })
      );
    }

    return result;
  }

  /**
   * @function
   * @name login
   * @param user
   * @returns
   */
  async login(user: { email: string; password: string }): Promise<Object> {
    const userDetails: any = await this.usersRepository.getByEmail(user.email, [
      "password",
      "id",
      "name",
      "email",
    ]);
    const isMatch: boolean = await this.passwordUtils.comparePassword(
      user.password,
      <string>userDetails?.password
    );
    if (!isMatch) {
      throw new CustomError(
        "User details does not match",
        HTTP_CODES.UNAUTHORIZED
      );
    }
    delete userDetails.password;
    const token = this.jwtUtils.generate(userDetails);
    return {
      token,
      user: userDetails,
    };
  }
}
