import { createConnection, Connection } from "typeorm";
import { config } from "../../config/db";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const dbConfig = process.env.NODE_ENV === "test" ? config.test : config.dev;

let connection: Connection;

export const initializeDatabase = async (): Promise<void> => {
  connection = await createConnection(dbConfig as any);
  console.log("Successfully connected to the database");
};

export const closeDatabase = async (): Promise<void> => {
  if (connection) {
    await connection.close();
    console.log("Database connection closed");
  }
};

export default { initializeDatabase, closeDatabase };
