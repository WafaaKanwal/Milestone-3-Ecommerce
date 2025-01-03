'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react'; // Import the `use` function

// Function to fetch product details
async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products`); // Fetch all products
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  const products = await res.json();
  return products.find((product: { id: string; category: string }) => product.id === id && product.category === 'shoes');
}

export default function ShoeDetails({ params }: { params: Promise<{ id: string }> }) {
  const [shoe, setShoe] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Unwrap the params object using `use`
  const { id } = use(params);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(id);
        if (!product) {
          setError('Product not found');
        } else {
          setShoe(product);
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Use `id` directly instead of `params.id`

  const addToCart = () => {
    if (!shoe) return; // Ensure the product is available

    // Get the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if the product is already in the cart
    const existingItem = cart.find((item: { id: string }) => item.id === shoe.id);

    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it with the selected quantity
      cart.push({ ...shoe, quantity });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart Updated:', cart); // Log the updated cart

    // Trigger a custom event to update the cart count in the navbar
    window.dispatchEvent(new Event('cartUpdated'));

    // Redirect to the cart page
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{error}</h1>
          <Link href="/shoes" className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
            ← Back to Shoes
          </Link>
        </div>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link href="/shoes" className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
            ← Back to Shoes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Shoes Link */}
        <div className="mb-8">
          <Link href="/shoes" className="text-gray-600 hover:text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Shoes
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src={shoe.imageUrl}
                alt={shoe.name}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{shoe.name}</h1>
                <p className="text-2xl font-semibold text-gray-800 mb-6">
                  ${typeof shoe.price === 'number' ? shoe.price.toFixed(2) : 'N/A'}
                </p>
                <p className="text-gray-700 mb-8">{shoe.description}</p>

                {/* Color Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900">
                    {shoe.colors.map((color: string) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900">
                    {shoe.sizes.map((size: string) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-300 text-gray-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}