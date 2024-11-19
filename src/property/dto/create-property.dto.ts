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

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    ownerId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(PropertyType)
    type: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TransaccionType)
    transactionType: string;

    @IsInt()
    @Min(1)
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    features: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(PropertyState)
    state: string;
}
