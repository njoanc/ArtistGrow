"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    server: {
        port: parseInt(process.env.SERVER_PORT || "3000", 10),
    },
    db: {
        host: "localhost",
        type: "mysql",
        synchronize: "true",
        entities: ["src/entity/**/*.ts"],
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
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
};
//# sourceMappingURL=default.js.map