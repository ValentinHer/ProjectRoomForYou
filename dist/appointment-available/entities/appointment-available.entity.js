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
exports.AppointmentAvailable = void 0;
const owner_entity_1 = require("../../owner/entities/owner.entity");
const typeorm_1 = require("typeorm");
let AppointmentAvailable = class AppointmentAvailable {
};
exports.AppointmentAvailable = AppointmentAvailable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AppointmentAvailable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppointmentAvailable.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'hour_start' }),
    __metadata("design:type", String)
], AppointmentAvailable.prototype, "hourStart", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'hour_end' }),
    __metadata("design:type", String)
], AppointmentAvailable.prototype, "hourEnd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => owner_entity_1.Owner, owner => owner.appointmentAvailables),
    __metadata("design:type", owner_entity_1.Owner)
], AppointmentAvailable.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AppointmentAvailable.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AppointmentAvailable.prototype, "updatedAt", void 0);
exports.AppointmentAvailable = AppointmentAvailable = __decorate([
    (0, typeorm_1.Entity)()
], AppointmentAvailable);
//# sourceMappingURL=appointment-available.entity.js.map