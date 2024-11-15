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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentAvailableController = void 0;
const common_1 = require("@nestjs/common");
const appointment_available_service_1 = require("./appointment-available.service");
const create_appointment_available_dto_1 = require("./dto/create-appointment-available.dto");
const update_appointment_available_dto_1 = require("./dto/update-appointment-available.dto");
let AppointmentAvailableController = class AppointmentAvailableController {
    constructor(appointmentAvailableService) {
        this.appointmentAvailableService = appointmentAvailableService;
    }
    async create(createAppointmentAvailableDto) {
        return await this.appointmentAvailableService.create(createAppointmentAvailableDto);
    }
    async findAll() {
        return await this.appointmentAvailableService.findAll();
    }
    async findOne(id) {
        return await this.appointmentAvailableService.findOne(id);
    }
    async update(id, updateAppointmentAvailableDto) {
        return await this.appointmentAvailableService.update(id, updateAppointmentAvailableDto);
    }
    async remove(id) {
        return await this.appointmentAvailableService.remove(id);
    }
};
exports.AppointmentAvailableController = AppointmentAvailableController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_available_dto_1.CreateAppointmentAvailableDto]),
    __metadata("design:returntype", Promise)
], AppointmentAvailableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentAvailableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentAvailableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_available_dto_1.UpdateAppointmentAvailableDto]),
    __metadata("design:returntype", Promise)
], AppointmentAvailableController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentAvailableController.prototype, "remove", null);
exports.AppointmentAvailableController = AppointmentAvailableController = __decorate([
    (0, common_1.Controller)('appointment-availables'),
    __metadata("design:paramtypes", [appointment_available_service_1.AppointmentAvailableService])
], AppointmentAvailableController);
//# sourceMappingURL=appointment-available.controller.js.map