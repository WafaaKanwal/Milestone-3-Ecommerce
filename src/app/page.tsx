'use client'; // Ensure this is a client-side component

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Array of hero images
const heroImages = [
  '/hero-image-1.jpg',
  '/hero-image-2.jpg',
  '/hero-image-3.jpg',
  '/hero-image-4.jpg',
];

// Function to fetch products from the API
async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products'); // Adjust the URL if needed
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Fetch featured products on component mount
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts();
        const featuredProductIds = [15, 20, 13, 14]; // Example IDs for featured products
        const filteredProducts = products.filter((product: { id: number }) =>
          featuredProductIds.includes(Number(product.id))
        );
        setFeaturedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Function to change the hero image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 h-[600px] overflow-hidden">
        {/* Background images with transitions */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`StepStyle Hero ${index + 1}`}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ))}

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            StepStyle
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Elevate your style with our premium collection of shoes and bags. Step into fashion, carry with confidence.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-block bg-gray-700 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-gray-500"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/products?category=shoes"
            className="relative rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
          >
            <Image
              src="/shoes.jpg"
              alt="Shoes Category"
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">Shoes</span>
            </div>
          </Link>
          <Link
            href="/products?category=bags"
            className="relative rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
          >
            <Image
              src="/bags.jpg"
              alt="Bags Category"
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">Bags</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured products */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product: { id: number; imageUrl: string; name: string; price: number }) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={product.imageUrl || '/placeholder-image.jpg'} // Fallback image if imageUrl is missing
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Sign up for our newsletter
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 mb-2 sm:mb-0 sm:rounded-l-md rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-2 rounded-md sm:rounded-l-none hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}