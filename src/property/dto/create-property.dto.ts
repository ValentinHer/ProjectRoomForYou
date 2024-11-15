import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from "class-validator";

export enum PropertyType {
    DEPARTAMENTO = "DEPARTAMENTO",
    CASA = "CASA",
    CUARTO = "CUARTO"
}

export enum PropertyState {
    DISPONIBLE = "DISPONIBLE",
    RENTADO = "RENTADO",
    VENDIDO = "VENDIDO"
}

export enum TransaccionType {
    RENTA = "RENTA",
    VENTA = "VENTA"
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
    type: PropertyType;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    transactionType: TransaccionType;

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
    state: PropertyState;
}
