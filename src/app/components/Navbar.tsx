'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Define isMenuOpen state
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from localStorage on component mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  // Listen for custom cart update event
  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length); // Update cart count
    };

    // Add event listener for custom cart update event
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <nav className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">StepStyle</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Home</Link>
              <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Products</Link>
              <Link href="/shoes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Shoes</Link>
              <Link href="/bags" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Bags</Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">About</Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Contact</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Link href="/account" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Account
              </Link>
              <Link href="/cart" className="relative text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {/* Cart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* Cart Count */}
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle isMenuOpen state
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</Link>
            <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Products</Link>
            <Link href="/shoes" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Shoes</Link>
            <Link href="/bags" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Bags</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contact</Link>
            <Link href="/account" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Account</Link>
            <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Cart</Link>
          </div>
        </div>
      )}
    </nav>
  );
}