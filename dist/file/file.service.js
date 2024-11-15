"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
let FileService = class FileService {
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: process.env.AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY,
                secretAccessKey: process.env.AWS_PUBLIC_ACCESS_SECRET
            }
        });
    }
    async create(files, createFileDto) {
        const { propertyTitle } = createFileDto;
        for (let i = 0; i < files.length; i++) {
            const fileExtension = files[i].originalname.split('.');
            const key = `${propertyTitle}_${i + 1}.${fileExtension[files.length - 1]}`;
            await this.client.send(new client_s3_1.PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Body: files[i].buffer,
                Key: key
            }));
        }
        return { message: `Images uploades successfully` };
    }
    findAll() {
        return `This action returns all file`;
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map