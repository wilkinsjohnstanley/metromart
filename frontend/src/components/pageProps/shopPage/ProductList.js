import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/metroSlice";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Update this URL to match your backend server address
                const response = await fetch('http://localhost:8800/product');
                
                console.log('Fetch response:', response);

                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched data:', data);

                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                    products.map(product => (
                        <div
                            key={product.id}
                            className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-700">Size: {product.size}</p>
                            <p className="text-green-600 font-bold">${product.price}</p>
                            <button onClick={() =>
          dispatch(
            addToCart({
              _id: product.id,
              name: product.name,
              quantity: 1,
              size: product.size,
              price: product.price,
            })
          )
        }
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;