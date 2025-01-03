import Link from 'next/link';
import Image from 'next/image';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// Function to fetch products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Our Products</h1>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => ( // Use the Product interface
            <Link href={`/products/${product.id}`} key={product.id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}