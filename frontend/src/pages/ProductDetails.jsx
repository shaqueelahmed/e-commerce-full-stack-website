// import {Link, link} from "react-router-dom";

// function ProductDetails() {
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://127.0.0.1:8000';

//     return (
//         <Link to={`/products/${product.id}`} className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 cursor-pointer">
//             <img
//                 src={`${BASEURL}${product.image}`}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-t-lg"
//             />
//             <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>    
//             <p className="text-gray-600 font-medium">${product.price}</p>
//             <p className="text-gray-500 text-sm">{product.description}</p>
//         </Link>
//     );
// }

// export default ProductDetails;
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function ProductDetails() {
    const { id } = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://127.0.0.1:8000';
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        if(!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }
        addToCart(product);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10 md:items-center">
                    <div className="flex items-center justify-center rounded-xl bg-gray-50 p-4">
                        <img
                            src={`${product.image}`}
                            alt={product.name}
                            className="max-h-[420px] w-full rounded-lg object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">{product.name}</h1>
                        <p className="mt-3 text-xl text-gray-600">${Number(product.price).toFixed(2)}</p>
                        <p className="mt-6 text-gray-700 leading-7">{product.description}</p>
                        <button onClick={handleAddToCart} className="mt-8 w-fit rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                            Add to Cart 🛒
                        </button>
                        <div className="mt-6 flex items-center space-x-4">
                            <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;