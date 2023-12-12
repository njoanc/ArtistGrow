import { Service } from "typedi";
import { getRepository } from "typeorm";
import { UsersDTO } from "../dto/users.dto";
import { UsersEntity } from "../entity/users.entity";

@Service()
export class UsersRepository {
  constructor() {}
  /**
   * @function
   * @name get
   * @returns
   */
  async get(): Promise<Array<UsersEntity>> {
    const result = await getRepository(UsersEntity).find({
      select: ["id", "name", "email"],
    });
    return result;
  }

  /**
   * @function
   * @name getByEmail
   * @param email
   * @returns
   */
  async getByEmail(
    email: string,
    selectList: Array<keyof UsersEntity>,
    includePassword?: boolean
  ): Promise<UsersEntity | undefined> {
    if (includePassword) selectList.push("password");
    const result = await getRepository(UsersEntity).findOne({
      where: { email },
      select: selectList,
    });
    return result;
  }

  /**
   * @function
   * @name save
   * @param data
   * @returns
   */
  async signUp(data: UsersDTO): Promise<UsersEntity> {
    const result = await getRepository(UsersEntity).save(<UsersEntity>data);
    return result;
  }
}
