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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var typedi_1 = require("typedi");
var email_templates_1 = require("../constants/email-templates");
var http_codes_1 = require("../constants/http-codes");
var custom_error_1 = require("../error/custom.error");
var logger_1 = require("../logger/logger");
var users_repository_1 = require("../respositories/users.repository");
var email_utils_1 = require("../utils/email.utils");
var jwt_utils_1 = require("../utils/jwt-utils");
var password_utils_1 = require("../utils/password.utils");
var UsersService = /** @class */ (function () {
    function UsersService(usersRepository, passwordUtils, emailUtils, jwtUtils) {
        this.usersRepository = usersRepository;
        this.passwordUtils = passwordUtils;
        this.emailUtils = emailUtils;
        this.jwtUtils = jwtUtils;
        this.logger = logger_1.Logger.getLogger;
    }
    /**
     * @function
     * @name getByEmail
     * @returns
     */
    UsersService.prototype.getByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("UsersService:get: Getting users from repo");
                        return [4 /*yield*/, this.usersRepository.getByEmail(email, [
                                "id",
                                "name",
                                "email",
                            ])];
                    case 1:
                        result = _a.sent();
                        this.logger.debug("UsersService:get: Users list retrieved ", { result: result });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @function
     * @name get
     * @returns
     */
    UsersService.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("UsersService:get: Getting users from repo");
                        return [4 /*yield*/, this.usersRepository.get()];
                    case 1:
                        result = _a.sent();
                        this.logger.debug("UsersService:get: Users list retrieved ", { result: result });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @function
     * @name save
     * @param data
     * @returns
     */
    UsersService.prototype.signUp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, password, _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug("UsersService:save: Saving user details");
                        return [4 /*yield*/, this.usersRepository.getByEmail(data.email, [
                                "id",
                                "email",
                                "name",
                            ])];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            this.logger.debug("UsersService:save: User exists");
                            throw new custom_error_1.CustomError("User already exists", http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR);
                        }
                        if (!data.password) {
                            // Variable length of password per user
                            data.password = this.passwordUtils.generate(data.email.split("@")[0].length);
                        }
                        password = data.password;
                        _a = data;
                        return [4 /*yield*/, this.passwordUtils.hashPassword(data.password)];
                    case 2:
                        _a.password = _b.sent();
                        return [4 /*yield*/, this.usersRepository.signUp(data)];
                    case 3:
                        result = _b.sent();
                        if (!result) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.emailUtils.send(email_templates_1.EmailTemplatesConstants.SIGN_UP, { to: result.email }, Object.assign({
                                password: password,
                                appName: "artistGrow",
                                userName: result.email,
                                name: result.name,
                            }))];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        this.logger.debug("UsersService:save: User details saved");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @function
     * @name login
     * @param user
     * @returns
     */
    UsersService.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userDetails, isMatch, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.getByEmail(user.email, [
                            "password",
                            "id",
                            "name",
                            "email",
                        ])];
                    case 1:
                        userDetails = _a.sent();
                        return [4 /*yield*/, this.passwordUtils.comparePassword(user.password, userDetails === null || userDetails === void 0 ? void 0 : userDetails.password)];
                    case 2:
                        isMatch = _a.sent();
                        if (!isMatch) {
                            throw new custom_error_1.CustomError("User details does not match", http_codes_1.HTTP_CODES.UNAUTHORIZED);
                        }
                        delete userDetails.password;
                        token = this.jwtUtils.generate(userDetails);
                        return [2 /*return*/, {
                                token: token,
                                user: userDetails,
                            }];
                }
            });
        });
    };
    UsersService = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [users_repository_1.UsersRepository,
            password_utils_1.PasswordUtils,
            email_utils_1.EmailUtils,
            jwt_utils_1.JWTUtils])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map