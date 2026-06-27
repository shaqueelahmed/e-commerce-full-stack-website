import {useState} from 'react';
import {useCart} from '../context/CartContext.jsx';
import {authFetch} from '../utils/auth.js';
import {useNavigate} from 'react-router-dom';

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://localhost:8000';
    const navigate = useNavigate();
    const {clearCart} = useCart();

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Order placed successfully!");
                fetch(`${BASEURL}/api/cart/`);
                clearCart();
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setMessage(data.error || "Failed to place order. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred while placing the order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-center">Checkout</h1>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded border p-2"
                    />
                    <textarea
                        name="address"
                        placeholder="Full Address"
                        value={form.address}    
                        onChange={handleChange}
                        required
                        className="w-full rounded border p-2"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded border p-2"
                    />
                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        required
                        className="w-full rounded border p-2"
                    >
                        <option value="COD">Cash on Delivery</option>
                        <option value="credit_card">Online Payment</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                    {message && (
                        <p className="mt-4 text-center text-green-600">{message}</p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;