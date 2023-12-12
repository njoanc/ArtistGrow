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
exports.EmailTemplatesEntity = void 0;
var typeorm_1 = require("typeorm");
var EmailTemplatesEntity = /** @class */ (function () {
    function EmailTemplatesEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("int", {
            primary: true,
        }),
        (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
        __metadata("design:type", String)
    ], EmailTemplatesEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 300,
        }),
        __metadata("design:type", String)
    ], EmailTemplatesEntity.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 300,
            type: "varchar",
        }),
        __metadata("design:type", String)
    ], EmailTemplatesEntity.prototype, "subject", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
        }),
        __metadata("design:type", String)
    ], EmailTemplatesEntity.prototype, "content", void 0);
    EmailTemplatesEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "emailtemplates" })
    ], EmailTemplatesEntity);
    return EmailTemplatesEntity;
}());
exports.EmailTemplatesEntity = EmailTemplatesEntity;
//# sourceMappingURL=email-template.entity.js.map