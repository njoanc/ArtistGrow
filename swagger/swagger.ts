import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./docs.json";

export const swaggerOptions = (app: Express) => {
  // Swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.writeHead(200, { "Content-Type": "text/html" }),
      res.send(swaggerDocument);
  });
};
