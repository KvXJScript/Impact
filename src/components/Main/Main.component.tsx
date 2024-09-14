import { Link } from 'react-router-dom';
import { RoutePath } from "src/routes";
import { useQuery } from '@tanstack/react-query';
import { CategoryType } from "src/components";
import { QueryKeys, fetchCategories } from "src/api";
import { useAppContext } from "src/Context";

export const Main = () => {
    
    const { cart } = useAppContext();
    
    const { data: categories, isLoading: isCategoryLoading, error:categoryError } = useQuery<CategoryType[], Error>({
        queryKey: [QueryKeys.Categories],
        queryFn: fetchCategories,
    });
    
    if (isCategoryLoading) return <p>Loading...</p>;
    
    if (categoryError instanceof Error) return <p>Error: {categoryError?.message}</p>;
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">Categories</h1>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories?.map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                        <Link to={`${RoutePath.Category}/${category.route}`}>
                            <h2 className="text-lg font-medium text-gray-800 hover:text-blue-500">
                                {category.name}
                            </h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};