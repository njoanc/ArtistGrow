import { UsersDTO } from "../dto/users.dto";
import { UsersEntity } from "../entity/users.entity";
export declare class UsersRepository {
    constructor();
    /**
     * @function
     * @name get
     * @returns
     */
    get(): Promise<Array<UsersEntity>>;
    /**
     * @function
     * @name getByEmail
     * @param email
     * @returns
     */
    getByEmail(email: string, selectList: Array<keyof UsersEntity>, includePassword?: boolean): Promise<UsersEntity | undefined>;
    /**
     * @function
     * @name save
     * @param data
     * @returns
     */
    signUp(data: UsersDTO): Promise<UsersEntity>;
}
//# sourceMappingURL=users.repository.d.ts.map