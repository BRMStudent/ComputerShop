import { Customer } from "./customer";
import { Product } from "./product";

export interface Order {
    id: number;
    dateTime: Date;
    totalPrice: number;
    customerId: number;
    customer?: Customer;
}

export interface Item {
    id: number;
    orderId?: number;
    order?: Order;
    productId: number;
    product?: Product;
    unitPrice: number;
    quantity: number;
}

export interface OrderOutput {
    order: Order;
    items:  Item[];
}