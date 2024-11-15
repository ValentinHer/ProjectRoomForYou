import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    create(files: Array<Express.Multer.File>, createFileDto: CreateFileDto): Promise<void>;
    findAll(): string;
}
