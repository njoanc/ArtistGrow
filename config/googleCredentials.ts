import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const googleCredentials = {
  jwtSecretKey: process.env.JWT_SECRET_KEY || "defaultSecretKey",

  google: {
    googleClientId: process.env.GOOGLE_CLIENT_ID || "uhst6ADGFHV",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "uhsUJt6ADGFHV",
  },
};
