import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
export default class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    get(req: Request, res: Response): Promise<void>;
    signUp(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    findUserByEmail(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=users.controller.d.ts.map