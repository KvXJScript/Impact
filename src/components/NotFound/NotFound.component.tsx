import { Link } from 'react-router-dom';
import { RoutePath } from "src/routes";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to={RoutePath.Main}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
                Back to Home
            </Link>
        </div>
    );
}