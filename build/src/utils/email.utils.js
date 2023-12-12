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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailUtils = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var ejs_1 = __importDefault(require("ejs"));
var logger_1 = require("../logger/logger");
var email_template_repository_1 = require("../respositories/email-template.repository");
var custom_error_1 = require("../error/custom.error");
var http_codes_1 = require("../constants/http-codes");
var typedi_1 = require("typedi");
var default_1 = require("../../config/default");
var EmailUtils = /** @class */ (function () {
    function EmailUtils() {
        var _this = this;
        this.logger = logger_1.Logger.getLogger;
        var options = default_1.config.smtp;
        var emailOptions = JSON.parse(JSON.stringify(options));
        this.transporter = nodemailer_1.default.createTransport(emailOptions);
        this.transporter.on("error", function (error) {
            _this.logger.error("Email transport failed to initialize", { error: error });
        });
        this.emailTemplateRepository = new email_template_repository_1.EmailTemplateRepository();
    }
    /**
     * @function
     * @param templateName
     * @param options
     * @param placeholders
     * @returns
     */
    EmailUtils.prototype.send = function (templateName, options, placeholders) {
        return __awaiter(this, void 0, void 0, function () {
            var template, html, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailTemplateRepository.get(templateName)];
                    case 1:
                        template = _a.sent();
                        if (!template) {
                            throw new custom_error_1.CustomError("Email template not found", http_codes_1.HTTP_CODES.NOT_FOUND);
                        }
                        html = ejs_1.default.render(template.content, placeholders);
                        options.html = html;
                        options.subject = template.subject;
                        return [4 /*yield*/, this.transporter.sendMail(options)];
                    case 2:
                        result = _a.sent();
                        this.logger.info("EmailUtils:send: Email send ", { result: result });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    EmailUtils = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [])
    ], EmailUtils);
    return EmailUtils;
}());
exports.EmailUtils = EmailUtils;
//# sourceMappingURL=email.utils.js.map