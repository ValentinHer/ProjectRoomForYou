import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { OwnerService } from '../owner/owner.service';
export declare class PropertyService {
    private propertyRepository;
    private ownerService;
    constructor(propertyRepository: Repository<Property>, ownerService: OwnerService);
    create(createPropertyDto: CreatePropertyDto): Promise<{
        title: string;
        type: import("./dto/create-property.dto").PropertyType;
        address: string;
        transactionType: import("./dto/create-property.dto").TransaccionType;
        price: number;
        description: string;
        features: string;
        state: import("./dto/create-property.dto").PropertyState;
    } & Property>;
    findAll(): Promise<Property[]>;
    findOne(id: string): Promise<Property>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
