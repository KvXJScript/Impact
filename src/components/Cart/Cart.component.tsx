import { Link } from 'react-router-dom';
import {RoutePath} from "src/routes";
import {useAppContext} from "src/Context";

export const Cart = () => {
    const { cart, setCart } = useAppContext();
    
    const getTotalPrice = (): number => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };
    
    const handleRemove = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
    };
    
    return (
        <div className="container w-full max-w-screen-lg mx-auto p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Your Cart</h1>
            
            {!cart.length ? (
                <div className="text-center">
                    <p className="text-gray-900 mb-4">Your cart is empty.</p>
                    <Link to={RoutePath.Main} className="text-blue-500 hover:underline">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="w-full">
                    <div className="mb-4">
                        <div className="flex flex-col items-start md:items-center md:flex-row border-b border-gray-300 mb-2 font-bold text-left text-gray-900">
                            <div className="flex-1 p-2">Product</div>
                            <div className="w-auto md:w-32 p-2 text-center">Quantity</div>
                            <div className="w-auto md:w-32 p-2 text-center">Price</div>
                            <div className="w-auto md:w-32 p-2 text-center">Total</div>
                            <div className="w-28 p-2"></div>
                        </div>
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-200 py-2">
                                <div className="flex-1 p-2 flex items-center text-gray-900">
                                    {item.image && <img src={item.image} alt={item.title} className="w-12 h-12 mr-4" />}
                                    <span className="truncate">{item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}</span>
                                </div>
                                <div className="w-auto md:w-32 p-2 text-center">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        className="border p-1 w-full bg-white text-gray-900"
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="w-auto md:w-32 p-2 text-center text-gray-900">${item.price.toFixed(2)}</div>
                                <div className="w-auto md:w-32 p-2 text-center text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                                <div className="w-28 p-2 text-center text-gray-900">
                                    <button
                                        className="text-red-500 hover:underline mr-[-10px]"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-right mb-4 text-gray-900">
                        <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between">
                        <Link to={RoutePath.Main} className="text-blue-500 hover:underline mb-4 md:mb-0">
                            Continue Shopping
                        </Link>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};