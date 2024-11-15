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
exports.AppointmentAvailableService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_available_entity_1 = require("./entities/appointment-available.entity");
const typeorm_2 = require("typeorm");
const owner_service_1 = require("../owner/owner.service");
let AppointmentAvailableService = class AppointmentAvailableService {
    constructor(appointmentAvailableRepository, ownerService) {
        this.appointmentAvailableRepository = appointmentAvailableRepository;
        this.ownerService = ownerService;
    }
    async create(createAppointmentAvailableDto) {
        const { ownerId, ...otherData } = createAppointmentAvailableDto;
        const ownerFound = await this.ownerService.findOne(ownerId);
        const day = otherData.day.toUpperCase();
        const dayFound = await this.appointmentAvailableRepository.findOne({
            where: {
                owner: { id: ownerId },
                day
            }
        });
        if (dayFound)
            throw new common_1.ConflictException("The day already exist");
        return await this.appointmentAvailableRepository.save({ owner: ownerFound, ...otherData });
    }
    async findAll() {
        return await this.appointmentAvailableRepository.find();
    }
    async findOne(id) {
        const appointmentAvailableFound = await this.appointmentAvailableRepository.findOne({
            where: { id }
        });
        if (!appointmentAvailableFound)
            throw new common_1.NotFoundException("Appointment Available Not Found");
        return appointmentAvailableFound;
    }
    async update(id, updateAppointmentAvailableDto) {
        const { ownerId, day, ...otherData } = updateAppointmentAvailableDto;
        const appointmentAvailableFound = await this.findOne(id);
        if (day)
            throw new common_1.NotAcceptableException("You can't change the day of Appointment Available");
        return await this.appointmentAvailableRepository.update(id, otherData);
    }
    async remove(id) {
        const appointmentAvailableFound = await this.findOne(id);
        const appointmentAvailableDeleted = await this.appointmentAvailableRepository.delete(id);
        return { message: `appointment Available with id: ${id} deleted` };
    }
};
exports.AppointmentAvailableService = AppointmentAvailableService;
exports.AppointmentAvailableService = AppointmentAvailableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_available_entity_1.AppointmentAvailable)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        owner_service_1.OwnerService])
], AppointmentAvailableService);
//# sourceMappingURL=appointment-available.service.js.map