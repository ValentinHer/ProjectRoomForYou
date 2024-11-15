"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentAvailableModule = void 0;
const common_1 = require("@nestjs/common");
const appointment_available_service_1 = require("./appointment-available.service");
const appointment_available_controller_1 = require("./appointment-available.controller");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_available_entity_1 = require("./entities/appointment-available.entity");
const owner_module_1 = require("../owner/owner.module");
let AppointmentAvailableModule = class AppointmentAvailableModule {
};
exports.AppointmentAvailableModule = AppointmentAvailableModule;
exports.AppointmentAvailableModule = AppointmentAvailableModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([appointment_available_entity_1.AppointmentAvailable]), owner_module_1.OwnerModule],
        controllers: [appointment_available_controller_1.AppointmentAvailableController],
        providers: [appointment_available_service_1.AppointmentAvailableService],
    })
], AppointmentAvailableModule);
//# sourceMappingURL=appointment-available.module.js.map