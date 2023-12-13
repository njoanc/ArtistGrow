import cors from "cors";
import Express from "express";
import * as http from "http";
import morgan from "morgan";
import "reflect-metadata";
import Container from "typedi";
import { config } from "../config/db";
import { Logger } from "../src/logger/logger";
import { swaggerOptions } from "../swagger/swagger";
import "./controllers/users.controller";

import { router } from "./decorators/controller.decorators";
import "./extensions/request.extension";
import { UsersMiddleware } from "./middlewares/auth.middleware";
import { initializeDatabase } from "./db/connection";

initializeDatabase();

const app = Express();
const server: http.Server = http.createServer(app);

const PORT = config.server.port;

//Api-Docs
swaggerOptions(app);

app.use(Express.json());
app.use(morgan("tiny"));
app.use(Express.static("public"));
app.use(cors());

const usersMiddleware = Container.get(UsersMiddleware);
const excludedRoutes = ["/user", "/user/login"];
app.use("/api", usersMiddleware.validateSession(excludedRoutes));
app.use(router);

server.listen(PORT, () => {
  Logger.info(`Server running at http://localhost:${PORT}`);
});
