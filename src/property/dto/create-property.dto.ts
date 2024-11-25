import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID, Min } from "class-validator";

export enum PropertyType {
    departamento = "departamento",
    casa = "casa",
    cuarto = "cuarto"
}

export enum PropertyState {
    disponible = "disponible",
    rentado = "rentado",
    vendido = "vendido"
}

export enum TransaccionType {
    renta = "renta",
    venta = "venta"
}

export class CreatePropertyDto {

    @ApiProperty({example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'Owner id'})
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    ownerId: string;

    @ApiProperty({example: 'Casa en Lopez Mateos, calle 8', description: 'Property title'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({enum: PropertyType, description: 'Property type'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(PropertyType)
    type: string;

    @ApiProperty({example: 'Lopez Mateos, Primera Seccion', description: 'Property address'})
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({enum: TransaccionType, description: 'Property transaccion type'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(TransaccionType)
    transactionType: string;

    @ApiProperty({example: 1400, description: 'Property price'})
    @IsInt()
    @Min(1)
    price: number;

    @ApiProperty({example: 'A house in Col. Lopez Mateos', description: 'Property description'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: 'With Wifi, a bed and hot water', description: 'Property features'})
    @IsString()
    @IsNotEmpty()
    features: string;

    @ApiProperty({enum: PropertyState, description: 'Property state'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(PropertyState)
    state: string;
}
