'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  colors: string[];
  sizes?: string[]; // Optional field for 'shoes' category
  category: string;
}

async function getProduct(id: string): Promise<Product> {
  const apiUrl = 'https://678548251ec630ca33a7fc66.mockapi.io/products';
  const res = await fetch(`${apiUrl}/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Using async function to handle the unwrapping of params
    const fetchProduct = async () => {
      try {
        // Unwrap params
        const { id } = await params;  // Use await to get params
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [params]); // Watch params to re-fetch on changes

  const addToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
    alert('Product added to cart!');
  };

  if (!product) {
    return <div className="text-center py-20 text-gray-700">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products" className="text-gray-600 hover:text-gray-900 flex items-center">
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
            Back to Products
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-8">{product.description}</p>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900">
                    {product.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {product.category === 'shoes' && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900">
                      {product.sizes?.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-300 text-gray-700">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

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
