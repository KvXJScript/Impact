import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import {Product} from "src/components";

interface AppContextProps {
    cart: Product[];
    setCart: Dispatch<SetStateAction<Product[]>>;
    categoryName: string;
    setCategoryName: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState<string>("jewelery");
    
    return (
        <AppContext.Provider value={{ cart, setCart, categoryName, setCategoryName }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};