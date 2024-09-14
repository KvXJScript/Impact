import {API_ROOT_PATH} from "./api.utils.ts";
import {CategoryType} from "src/components";
import { v4 as uuidv4 } from 'uuid';

export const fetchCategories = async ():Promise<CategoryType[]> => {
    try {
        const response = await fetch(`${API_ROOT_PATH}/products/categories`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        return data.map((category: string) => {
            return{
                name: category.charAt(0).toUpperCase() + category.slice(1),
                route: category,
                id: uuidv4(),
        }});
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};