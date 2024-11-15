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
exports.Owner = void 0;
const typeorm_1 = require("typeorm");
const property_entity_1 = require("../../property/entities/property.entity");
const appointment_available_entity_1 = require("../../appointment-available/entities/appointment-available.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Owner = class Owner {
};
exports.Owner = Owner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Owner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Owner.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_entity_1.Property, property => property.owner),
    __metadata("design:type", Array)
], Owner.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_available_entity_1.AppointmentAvailable, appointmemtAvailable => appointmemtAvailable.owner),
    __metadata("design:type", Array)
], Owner.prototype, "appointmentAvailables", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Owner.prototype, "createdAt", void 0);
exports.Owner = Owner = __decorate([
    (0, typeorm_1.Entity)()
], Owner);
//# sourceMappingURL=owner.entity.js.map