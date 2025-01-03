// app/cart/page.tsx
'use client';

import Image from 'next/image';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  // Update quantity of a specific item
  const updateQuantity = (id: string, newQuantity: number) => {
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove an item from the cart
  const removeItem = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this item?');
    if (confirmDelete) {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <Link href="/products" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Continue Shopping →
                </Link>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex flex-col sm:flex-row sm:items-center">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={1920} // Set the width of the image
                          height={1080} // Set the height of the image
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow sm:ml-6 mt-4 sm:mt-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                            <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-4 flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700 p-2 border border-gray-300 rounded-l-md"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 border-t border-b border-gray-300 text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 p-2 border border-gray-300 rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Total and Checkout Button */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-900">Total:</p>
                    <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
                  </div>
                  <Link
                    href={{
                      pathname: '/checkout',
                      query: {
                        items: JSON.stringify(cartItems), // Pass cart items as a query parameter
                        total: total.toFixed(2), // Pass total amount as a query parameter
                      },
                    }}
                    className="mt-6 w-full sm:w-auto bg-gray-900 text-white font-bold py-3 px-6 rounded-md text-center block transition duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                  <div className="mt-4 text-center">
                    <Link href="/products" className="text-gray-900 hover:text-gray-500 font-medium">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}