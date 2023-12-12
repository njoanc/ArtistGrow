export default {
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
};
