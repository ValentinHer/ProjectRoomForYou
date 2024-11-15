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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const typeorm_2 = require("typeorm");
const client_service_1 = require("../client/client.service");
const property_service_1 = require("../property/property.service");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepository, clientService, propertyService) {
        this.appointmentRepository = appointmentRepository;
        this.clientService = clientService;
        this.propertyService = propertyService;
    }
    async create(createAppointmentDto) {
        const { clientId, propertyId, ...otherData } = createAppointmentDto;
        const clientFound = await this.clientService.findOne(clientId);
        const propertyFound = await this.propertyService.findOne(propertyId);
        return await this.appointmentRepository.save({ client: clientFound, property: propertyFound, ...otherData });
    }
    async findAll() {
        return await this.appointmentRepository.find();
    }
    async findOne(id) {
        const appointmentFound = await this.appointmentRepository.findOne({
            where: { id }
        });
        if (!appointmentFound)
            throw new common_1.NotFoundException("Appointment Not Found");
        return appointmentFound;
    }
    async update(id, updateAppointmentDto) {
        const appointmentFound = await this.findOne(id);
        const { clientId, propertyId, ...otherData } = updateAppointmentDto;
        await this.appointmentRepository.update(id, otherData);
    }
    async remove(id) {
        const appointmentFound = await this.findOne(id);
        try {
            const appointmentDeleted = await this.appointmentRepository.delete(id);
            return { message: `Appointment with id: ${id} deleted` };
        }
        catch (error) {
            return { message: `error to delete the appointment: ${error}` };
        }
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_service_1.ClientService,
        property_service_1.PropertyService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map