import { Link, useParams } from 'react-router-dom';
import { RoutePath} from "src/routes";
import { Product } from './category.types.ts';
import { useQuery } from "@tanstack/react-query";
import { QueryKeys, fetchProducts } from "src/api";
import { useAppContext } from "src/context";

export const Category = () => {
    
    const { cart, setCart } = useAppContext();
    const { categoryName } = useParams<{ categoryName: string }>();
    
    const { data, isLoading, error } = useQuery<Product[], Error>({
        queryKey: [QueryKeys.Products],
        queryFn: fetchProducts,
    });
    
    if (isLoading) return <p>Loading...</p>;
    
    if (error instanceof Error) return <p>Error: {error.message}</p>;
    
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            
            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: (updatedCart[existingProductIndex].quantity || 1) + 1
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    
    const categoryProducts = data?.filter(
        (product) => product.category === categoryName
    );
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <Link to={RoutePath.Main} className="text-lg font-bold text-blue-500">
                    Back to Home
                </Link>
                <Link to={RoutePath.Cart} className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a1 1 0 0 0 1 .84h9.72a1 1 0 0 0 .98-.79l1.72-8.61H6"></path>
                    </svg>
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs text-center font-bold rounded-full">
                        {cart.length}
                    </span>
                </Link>
            </div>
            
            {/* Category Info */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">{categoryName && (categoryName.charAt(0).toUpperCase() + categoryName.slice(1))}</h1>
                <p className="text-gray-500">{categoryProducts?.length} products available</p>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryProducts?.map((product: Product) => (
                    <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="mb-4 w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-lg font-medium text-gray-800">{product.title}</h2>
                        <p className="text-gray-600 mb-4">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};