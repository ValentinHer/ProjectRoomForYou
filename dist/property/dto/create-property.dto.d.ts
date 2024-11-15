export declare enum PropertyType {
    DEPARTAMENTO = "DEPARTAMENTO",
    CASA = "CASA",
    CUARTO = "CUARTO"
}
export declare enum PropertyState {
    DISPONIBLE = "DISPONIBLE",
    RENTADO = "RENTADO",
    VENDIDO = "VENDIDO"
}
export declare enum TransaccionType {
    RENTA = "RENTA",
    VENTA = "VENTA"
}
export declare class CreatePropertyDto {
    ownerId: string;
    title: string;
    type: PropertyType;
    address: string;
    transactionType: TransaccionType;
    price: number;
    description: string;
    features: string;
    state: PropertyState;
}
