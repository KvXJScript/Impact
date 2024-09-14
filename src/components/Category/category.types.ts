export interface CreateProductPayload {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export interface Product extends CreateProductPayload {
    id: number;
    quantity: number;
}