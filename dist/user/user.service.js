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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../role/entities/role.entity");
let UserService = class UserService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async create(user) {
        const { role, password, ...otherData } = user;
        const roleFind = await this.roleRepository.findOne({
            where: { name: role }
        });
        if (!roleFind)
            return new common_1.HttpException('Role not Found', common_1.HttpStatus.NOT_FOUND);
        const passwordHash = await this.hashPassword(password);
        const newUser = { ...otherData, role: roleFind, password: passwordHash };
        return await this.userRepository.save(newUser);
    }
    async findAll(query) {
        const limit = query.limit ?? 10;
        const page = query.page ?? 1;
        const skipData = (page - 1) * limit;
        const [users, total] = await this.userRepository.findAndCount({
            skip: skipData,
            take: limit,
            relations: { role: true }
        });
        const lastPage = Math.ceil(total / limit) == 0 ? 1 : Math.ceil(total / limit);
        if (page > lastPage)
            throw new common_1.HttpException('Page Not Found', common_1.HttpStatus.NOT_FOUND);
        return { data: users, total, page, lastPage };
    }
    async findOne(id) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });
        if (!userFound)
            throw new common_1.NotFoundException("User Not Found");
        return userFound;
    }
    async update(id, updateUserDto) {
        const userFound = await this.findOne(id);
        const { role, password, ...otherData } = updateUserDto;
        if (role)
            throw new common_1.HttpException("Role can't be changed", common_1.HttpStatus.CONFLICT);
        let newPassword;
        if (password) {
            newPassword = await this.hashPassword(password);
        }
        const userUpdate = { password: newPassword, ...otherData };
        return this.userRepository.update(userFound.id, userUpdate);
    }
    async remove(id) {
        const userFound = await this.findOne(id);
        try {
            const userDeleted = await this.userRepository.delete(id);
            return { message: `User with id: ${id} deleted` };
        }
        catch (e) {
            throw new common_1.HttpException(`You must first delete the table relationed ${e}`, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async hashPassword(password, salts = 10) {
        return await bcrypt.hash(password, salts);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map