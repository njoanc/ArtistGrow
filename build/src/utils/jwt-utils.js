"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtils = void 0;
var default_1 = require("../../config/default");
var jsonwebtoken_1 = require("jsonwebtoken");
var custom_error_1 = require("../error/custom.error");
var http_codes_1 = require("../constants/http-codes");
var typedi_1 = require("typedi");
var JWTUtils = /** @class */ (function () {
    function JWTUtils() {
        this.jwtSecretKey = default_1.config.jwtSecretKey;
    }
    /**
     * @function
     * @name generate
     * @param userDetails
     * @returns
     */
    JWTUtils.prototype.generate = function (userDetails) {
        return (0, jsonwebtoken_1.sign)(Object.assign({}, userDetails), this.jwtSecretKey, {
            expiresIn: "1h",
        });
    };
    /**
     * @function
     * @name verify
     * @param token
     * @param email
     */
    JWTUtils.prototype.verify = function (token) {
        try {
            var result = ((0, jsonwebtoken_1.verify)(token, this.jwtSecretKey));
            return result;
        }
        catch (error) {
            throw new custom_error_1.CustomError(error.message, http_codes_1.HTTP_CODES.UNAUTHORIZED);
        }
    };
    JWTUtils = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [])
    ], JWTUtils);
    return JWTUtils;
}());
exports.JWTUtils = JWTUtils;
//# sourceMappingURL=jwt-utils.js.map