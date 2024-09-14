import {API_ROOT_PATH} from "./api.utils.ts";
import {Product} from "src/components";

export const fetchProducts = async ():Promise<Product[]> => {
    try {
        const response = await fetch(`${API_ROOT_PATH}/products`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const products: Product[] = await response.json();
        
        return products.map(product => ({
            ...product,
            quantity: 1
        }))
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
