import winston from "winston";
import { UsersDTO } from "../dto/users.dto";
import { UsersRepository } from "../respositories/users.repository";
import { EmailUtils } from "../utils/email.utils";
import { JWTUtils } from "../utils/jwt-utils";
import { PasswordUtils } from "../utils/password.utils";
export declare class UsersService {
    private usersRepository;
    private passwordUtils;
    private emailUtils;
    private jwtUtils;
    logger: winston.Logger;
    constructor(usersRepository: UsersRepository, passwordUtils: PasswordUtils, emailUtils: EmailUtils, jwtUtils: JWTUtils);
    /**
     * @function
     * @name getByEmail
     * @returns
     */
    getByEmail(email: string): Promise<import("../entity/users.entity").UsersEntity | undefined>;
    /**
     * @function
     * @name get
     * @returns
     */
    get(): Promise<import("../entity/users.entity").UsersEntity[]>;
    /**
     * @function
     * @name save
     * @param data
     * @returns
     */
    signUp(data: UsersDTO): Promise<import("../entity/users.entity").UsersEntity>;
    /**
     * @function
     * @name login
     * @param user
     * @returns
     */
    login(user: {
        email: string;
        password: string;
    }): Promise<Object>;
}
//# sourceMappingURL=users.service.d.ts.map