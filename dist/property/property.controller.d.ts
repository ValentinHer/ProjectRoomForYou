import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto): Promise<{
        title: string;
        type: import("./dto/create-property.dto").PropertyType;
        address: string;
        transactionType: import("./dto/create-property.dto").TransaccionType;
        price: number;
        description: string;
        features: string;
        state: import("./dto/create-property.dto").PropertyState;
    } & import("./entities/property.entity").Property>;
    findAll(): Promise<import("./entities/property.entity").Property[]>;
    findOne(id: string): Promise<import("./entities/property.entity").Property>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
