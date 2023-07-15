export interface Product {
    id: number;
    name: string;
    unitPrice: number;
    image: string;
    description: string;
    remain: number;
    productId: number;
    productTypeId?: number,
    productType?: ProductType;
}

export interface ProductType {
    id: number;
    name: string;
}