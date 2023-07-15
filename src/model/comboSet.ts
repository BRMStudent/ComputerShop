import { Product } from "./product";

export interface ComboSet {
    id: number;
    name: string;
    discount: number;
    sumPrice: number;
    approved: boolean;
}

export interface ComboSetItem {
    id: number;
    comboSetId: number;
    comboSet?: ComboSet;
    productId: number;
    product?: Product;
    unitPrice: number;
    quantity: number;
}

export interface ComboSetOutput {
    comboSet: ComboSet;
    comboSetItems: ComboSetItem[];
}