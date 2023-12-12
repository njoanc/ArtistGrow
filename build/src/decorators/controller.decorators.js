"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.router = void 0;
var express_1 = require("express");
var typedi_1 = __importDefault(require("typedi"));
var logger_1 = require("../logger/logger");
var logger = logger_1.Logger.getLogger;
exports.router = (0, express_1.Router)();
var Controller = function (prefix) {
    return function (target) {
        Reflect.defineMetadata("prefix", prefix, target);
        if (!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", [], target);
        }
        var routes = Reflect.getMetadata("routes", target);
        var instance = typedi_1.default.get(target);
        routes.forEach(function (route) {
            logger.debug("Registered route ", {
                path: "" + prefix + route.path,
                method: route.methodName,
                controller: target.name,
            });
            exports.router[route.method]("" + prefix + route.path, instance[route.methodName].bind(instance));
        });
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.decorators.js.map