import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'https://e-commerce-full-stack-website-e94i.onrender.com';
    const price = Number(product.price);

    return (
        <Link to={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 cursor-pointer">
                <img
                    src={`${BASEURL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-gray-600 font-medium">
                    ${Number.isFinite(price) ? price.toFixed(2) : product.price}
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;