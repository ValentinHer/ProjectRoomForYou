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
exports.Appointment = void 0;
const client_entity_1 = require("../../client/entities/client.entity");
const property_entity_1 = require("../../property/entities/property.entity");
const typeorm_1 = require("typeorm");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { name: 'date_start' }),
    __metadata("design:type", String)
], Appointment.prototype, "dateStart", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { name: 'date_end' }),
    __metadata("design:type", String)
], Appointment.prototype, "dateEnd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, client => client.appointments),
    __metadata("design:type", client_entity_1.Client)
], Appointment.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, property => property.appointments),
    __metadata("design:type", property_entity_1.Property)
], Appointment.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)()
], Appointment);
//# sourceMappingURL=appointment.entity.js.map