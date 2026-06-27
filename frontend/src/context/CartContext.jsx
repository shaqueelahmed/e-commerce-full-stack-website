import { createContext, useContext, useEffect, useState } from 'react';
import { authFetch, getAccessToken } from '../utils/auth';

const CartContext = createContext();

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'https://e-commerce-full-stack-website-e94i.onrender.com';

function normalizeCartItem(item) {
    return {
        id: item.id,
        product: item.product,
        name: item.product_name,
        price: Number(item.product_price ?? 0),
        image: item.product_image ? `${BASEURL}${item.product_image}` : '',
        quantity: item.quantity,
        product_name: item.product_name,
        product_price: Number(item.product_price ?? 0),
        product_image: item.product_image,
    };
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);

    const refreshCart = async () => {
        const response = await authFetch(`${BASEURL}/api/cart/`);

        if (!response.ok) {
            throw new Error('Failed to load cart');
        }

        const data = await response.json();
        setCartItems((data.items || []).map(normalizeCartItem));
    };

    useEffect(() => {
        refreshCart()
            .catch(() => setCartItems([]))
            .finally(() => setLoadingCart(false));
    }, []);

    const addToCart = async (product) => {
        const response = await authFetch(`${BASEURL}/api/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: product.id }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }

        await refreshCart();
    };

    const removeFromCart = async (itemId) => {
        const response = await authFetch(`${BASEURL}/api/cart/remove/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: itemId }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove from cart');
        }

        await refreshCart();
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }

        const response = await authFetch(`${BASEURL}/api/cart/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: itemId, quantity }),
        });

        if (!response.ok) {
            throw new Error('Failed to update cart quantity');
        }

        await refreshCart();
    };

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, loadingCart, addToCart, removeFromCart, updateQuantity, refreshCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);