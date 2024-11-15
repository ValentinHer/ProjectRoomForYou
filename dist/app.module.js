"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const appointment_module_1 = require("./appointment/appointment.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const property_module_1 = require("./property/property.module");
const appointment_available_module_1 = require("./appointment-available/appointment-available.module");
const role_module_1 = require("./role/role.module");
const owner_module_1 = require("./owner/owner.module");
const client_module_1 = require("./client/client.module");
const file_module_1 = require("./file/file.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? '5432'),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + '/**/*.entity.{ts,js}'],
                synchronize: true
            }),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            owner_module_1.OwnerModule,
            client_module_1.ClientModule,
            auth_module_1.AuthModule,
            property_module_1.PropertyModule,
            appointment_available_module_1.AppointmentAvailableModule,
            appointment_module_1.AppointmentModule,
            file_module_1.FileModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map