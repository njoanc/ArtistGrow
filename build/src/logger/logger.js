"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var winston_1 = __importDefault(require("winston"));
var config_1 = __importDefault(require("config"));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "getLogger", {
        get: function () {
            if (!this.logger) {
                var loggerConfig = config_1.default.get("logger");
                var loggerOptions = {
                    level: loggerConfig.level || "info",
                    transports: [new winston_1.default.transports.Console()],
                    format: winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.prettyPrint(), winston_1.default.format.colorize({ all: true })),
                };
                this.logger = winston_1.default.createLogger(loggerOptions);
            }
            return this.logger;
        },
        enumerable: false,
        configurable: true
    });
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map