import { CreateFileDto } from './dto/create-file.dto';
import { S3Client } from '@aws-sdk/client-s3';
export declare class FileService {
    client: S3Client;
    create(files: Array<Express.Multer.File>, createFileDto: CreateFileDto): Promise<{
        message: string;
    }>;
    findAll(): string;
}
