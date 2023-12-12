"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = require("../../config/default");
var typeorm_1 = require("typeorm");
var logger_1 = require("../logger/logger");
var load_data_1 = require("../pre-load-data/scripts/load-data");
var logger = logger_1.Logger.getLogger;
var ormConfig = Object.assign({}, default_1.config.db);
(0, typeorm_1.createConnection)(ormConfig).then(function () {
    logger.info("DB Connected", { timestamp: Date.now() });
    new load_data_1.LoadData();
});
//# sourceMappingURL=connection.js.map