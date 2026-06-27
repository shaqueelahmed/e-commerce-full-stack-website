import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    }

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
                Shaky Cart 🛍️
            </Link>

            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        {/* <Link to="/profile" className="text-gray-800 hover:text-gray-600 font-medium">
                            Profile
                        </Link> */}

                        <button
                            onClick={handleLogout}
                            className="text-gray-800 hover:text-gray-600 font-medium"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-800 hover:text-gray-600 font-medium">
                            Login
                        </Link>

                        <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">
                            Signup
                        </Link>
                    </>
                )}
            </div>


            <Link to="/cart" className="relative text-gray-800 hover:text-gray-600 font-medium">
                Cart 🛒
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    );
}

export default Navbar;