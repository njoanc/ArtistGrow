"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var winston = __importStar(require("winston"));
var expressWinston = __importStar(require("express-winston"));
var cors_1 = __importDefault(require("cors"));
var default_1 = require("../config/default");
var typedi_1 = __importDefault(require("typedi"));
// Custom declarations
require("./db/connection");
require("./extensions/request.extension");
require("./controllers/users.controller");
var logger_1 = require("./logger/logger");
var auth_middleware_1 = require("./middlewares/auth.middleware");
var controller_decorators_1 = require("./decorators/controller.decorators");
var app = (0, express_1.default)();
var server = http.createServer(app);
var PORT = default_1.config.server.port;
var logger = logger_1.Logger.getLogger;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (process.env.NODE_ENV === "development") {
    loggerOptions.meta = false;
}
app.use(expressWinston.logger(loggerOptions));
var usersMiddleware = typedi_1.default.get(auth_middleware_1.UsersMiddleware);
var excludedRoutes = ["/user", "/user/login"];
app.use("/api", usersMiddleware.validateSession(excludedRoutes));
app.use(controller_decorators_1.router);
server.listen(PORT, function () {
    logger.info("Server running at http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map