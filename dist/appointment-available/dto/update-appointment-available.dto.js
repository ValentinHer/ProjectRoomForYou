"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentAvailableDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_appointment_available_dto_1 = require("./create-appointment-available.dto");
class UpdateAppointmentAvailableDto extends (0, mapped_types_1.PartialType)(create_appointment_available_dto_1.CreateAppointmentAvailableDto) {
}
exports.UpdateAppointmentAvailableDto = UpdateAppointmentAvailableDto;
//# sourceMappingURL=update-appointment-available.dto.js.map