"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Delete = exports.Post = exports.Get = void 0;
function Get(path) {
    return function (target, propertyKey) {
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        var routes = Reflect.getMetadata("routes", target.constructor);
        routes.push({
            method: "get",
            path: path,
            methodName: propertyKey,
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
exports.Get = Get;
function Post(path) {
    return function (target, propertyKey) {
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        var routes = Reflect.getMetadata("routes", target.constructor);
        routes.push({
            method: "post",
            path: path,
            methodName: propertyKey,
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
exports.Post = Post;
function Delete(path) {
    return function (target, propertyKey) {
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        var routes = Reflect.getMetadata("routes", target.constructor);
        routes.push({
            method: "delete",
            path: path,
            methodName: propertyKey,
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
exports.Delete = Delete;
function Put(path) {
    return function (target, propertyKey) {
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        var routes = Reflect.getMetadata("routes", target.constructor);
        routes.push({
            method: "put",
            path: path,
            methodName: propertyKey,
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
exports.Put = Put;
//# sourceMappingURL=router.decorator.js.map