'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Define the Shoe interface
interface Shoe {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

// Function to fetch products
async function getProducts(): Promise<Shoe[]> {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default function ShoesPage() {
  const [shoes, setShoes] = useState<Shoe[]>([]); // Use the Shoe interface
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        const shoes = products.filter((product) => product.category === 'shoes');
        setShoes(shoes);
      } catch {
        // You can handle errors here if necessary
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Shoes Collection</h1>
          <p className="mt-4 text-lg text-gray-600">Explore our premium collection of shoes, designed for style and comfort.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shoes.map((shoe) => (
            <div key={shoe.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
              {/* Product Image */}
              <div className="w-full h-64 relative">
                <Image
                  src={shoe.imageUrl}
                  alt={shoe.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{shoe.name}</h2>
                <p className="text-lg font-bold text-gray-800 mb-4">${shoe.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-6">{shoe.description}</p>
                <Link
                  href={`/shoes/${shoe.id}`}
                  className="inline-block w-full text-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
