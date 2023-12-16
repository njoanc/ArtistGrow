import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  server: {
    port: parseInt(process.env.SERVER_PORT || "3000", 10),
  },
  dev: {
    name: "default",
    host: "localhost",
    type: "mysql",
    synchronize: "false",
    entities: ["src/entity/**/*.ts"],
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    cli: {
      migrationsDir: "src/migrations",
    },
    username: process.env.DB_USERNAME || "jehanne",
    password: process.env.DB_PASSWORD || "K12345",
    database: process.env.DB_DATABASE || "artistgrow",
  },
  test: {
    name: "default",
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: ["src/entity/**/*.ts"],
    logging: true,
    dropSchema: true,
  },
  logger: {
    level: "info",
  },
  smtp: {
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY || "defaultSecretKey",

  google: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
