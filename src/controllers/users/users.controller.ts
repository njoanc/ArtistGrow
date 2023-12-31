import { Request, Response } from "express";
import { Service } from "typedi";
import { HTTP_CODES } from "../../constants/http-codes";
import { Controller } from "../../decorators/controller.decorators";
import { Get, Post } from "../../decorators/router.decorator";
import { UsersDTO } from "../../dto/users.dto";
import { UsersService } from "../../services/users/users.service";

@Controller("/api/user")
@Service()
export default class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/")
  async get(req: Request, res: Response) {
    try {
      const result = await this.usersService.get();
      res.send({ data: result });
    } catch (error: any) {
      res
        .status(error.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Post("/")
  async signUp(req: Request, res: Response) {
    try {
      const result = await this.usersService.signUp(<UsersDTO>req.body);
      res.send({ data: result });
    } catch (error: any) {
      res
        .status(error.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Post("/login")
  async login(req: Request, res: Response) {
    try {
      const result = await this.usersService.login(req.body);
      res.send({ data: result });
    } catch (error: any) {
      res
        .status(error.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Get("/useByEmail")
  async findUserByEmail(req: Request, res: Response) {
    try {
      const result = await this.usersService.getByEmail(
        <string>req.user?.email
      );
      res.send({ data: result });
    } catch (error: any) {
      res
        .status(error.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
