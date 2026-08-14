import {useCart} from '../context/CartContext.jsx';
import {Link} from 'react-router-dom';

function CartPages() {
    const {cartItems, removeFromCart, updateQuantity} = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'https://e-commerce-full-stack-website-e94i.onrender.com';
    console.log("cartItems:", cartItems);

    const total = cartItems.reduce((sum, item) => {
        const price = Number(item.product_price ?? item.price ?? 0);
        return sum + price * Number(item.quantity ?? 1);
    }, 0);

    return (
        <div className="pt-20 min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-4">
                            <div className="w-20 h-20 flex-shrink-0 mr-4">
                                {(item.product_image || item.image) && (
                                    <img
                                        src={item.product_image ? (item.product_image.startsWith('http') ? item.product_image : `${BASEURL}${item.product_image}`) : item.image}
                                        alt={item.product_name || item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{item.product_name || item.name}</h2>
                                <p className="text-gray-600">${Number(item.product_price ?? item.price ?? 0).toFixed(2)}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))} 
                    <div className="mt-6 text-right">
                        <h2 className="text-xl font-semibold">Total:</h2>
                        <p className="text-lg font-medium">${total.toFixed(2)}</p>
                        <Link to="/checkout" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Proceed to Checkout</Link>
                    </div>
                </div>
                        
            )}
        </div>
    );
}

export default CartPages;

        