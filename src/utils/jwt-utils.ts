import { sign, verify } from "jsonwebtoken";
import { Service } from "typedi";
import { config } from "../../config/db";
import { HTTP_CODES } from "../constants/http-codes";
import { CustomError } from "../error/custom.error";

@Service()
export class JWTUtils {
  private jwtSecretKey: string;
  constructor() {
    this.jwtSecretKey = config.jwtSecretKey;
  }

  /**
   * @function
   * @name generate
   * @param userDetails
   * @returns
   */
  generate(userDetails: { name: string; email: string; id: number }) {
    return sign(Object.assign({}, userDetails), this.jwtSecretKey, {
      expiresIn: "1h",
    });
  }

  /**
   * @function
   * @name verify
   * @param token
   * @param email
   */
  verify(token: string): { email: string; name: string; id: number } {
    try {
      const result = <{ email: string; name: string; id: number }>(
        verify(token, this.jwtSecretKey)
      );
      return result;
    } catch (error: any) {
      throw new CustomError(error.message, HTTP_CODES.UNAUTHORIZED);
    }
  }
}
