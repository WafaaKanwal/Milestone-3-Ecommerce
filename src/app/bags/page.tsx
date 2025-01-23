import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

// Fetching data directly inside the component (for server-side rendering in app directory)
async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products'); // Ensure this is correct
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function BagsPage() {
  // Fetch the products when the page loads
  const products = await getProducts();
  const bags = products.filter((product) => product.category === 'bags');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Bags Collection</h1>
          <p className="mt-4 text-lg text-gray-600">Explore our premium collection of bags, designed for style and functionality.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bags.map((bag) => (
            <div key={bag.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
              {/* Product Image */}
              <div className="w-full h-64 relative">
                <Image
                  src={bag.imageUrl}
                  alt={bag.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{bag.name}</h2>
                <p className="text-lg font-bold text-gray-800 mb-4">${bag.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-6">{bag.description}</p>
                <Link
                  href={`/bags/${bag.id}`}
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
