import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import "dotenv/config";
import "reflect-metadata";
import { closeDatabase, initializeDatabase } from "../src/db/connection";
chai.use(chaiAsPromised);

export const mochaHooks = {
  async beforeAll() {
    await initializeDatabase();
  },

  async afterAll() {
    await closeDatabase();
  },
};
