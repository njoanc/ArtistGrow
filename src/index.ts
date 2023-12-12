import cors from "cors";
import { default as Express } from "express";
import * as http from "http";
import morgan from "morgan";
import "reflect-metadata";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import Container from "typedi";
import { config } from "../config/db";
import { Logger } from "../src/logger/logger";
import swaggerOptions from "../swagger/swagger";
import "./controllers/users.controller";
// Custom declarations
import "./db/connection";
import { router } from "./decorators/controller.decorators";
import "./extensions/request.extension";
import { UsersMiddleware } from "./middlewares/auth.middleware";

const app = Express();
const server: http.Server = http.createServer(app);

const PORT = config.server.port;

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerOptions))
);

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
