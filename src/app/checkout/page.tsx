'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Retrieve cart items and total from query parameters
  useEffect(() => {
    const itemsParam = searchParams.get('items');
    const totalParam = searchParams.get('total');

    if (itemsParam) {
      const items = JSON.parse(itemsParam);
      setCartItems(items);
    }

    if (totalParam) {
      setTotal(parseFloat(totalParam));
    }
  }, [searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex-grow">
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            {/* Total */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between">
                <p className="text-xl font-bold text-gray-900">Total:</p>
                <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Payment Details</h2>
            <form className="space-y-6">
              {/* Card Number */}
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    required
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
              {/* Name on Card */}
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              {/* Billing Address */}
              <div>
                <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Address
                </label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  placeholder="123 Main St"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              {/* Zip Code */}
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="12345"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="CN">China</option>
                  <option value="BR">Brazil</option>
                </select>
              </div>
              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}