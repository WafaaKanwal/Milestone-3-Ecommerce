import { NextResponse } from 'next/server';

const products = [
  {
    id: '1',
    name: 'Classic Leather Oxford',
    price: 129.99,
    description: 'Timeless leather oxford shoes, perfect for formal occasions.',
    category: 'shoes',
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/oxford-shoes.jpg'
  },
  {
    id: '2',
    name: 'Comfortable Running Sneakers',
    price: 89.99,
    description: 'Lightweight and breathable running shoes for your daily jog.',
    category: 'shoes',
    colors: ['Blue', 'Red', 'White'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/sneakers-shoes.jpg'
  },
  {
    id: '3',
    name: 'Elegant Tote Bag',
    price: 79.99,
    description: 'Spacious and stylish tote bag for your everyday needs.',
    category: 'bags',
    colors: ['Black', 'Beige', 'Navy'],
    imageUrl: '/tote-bag.jpg'
  },
  {
    id: '4',
    name: 'Leather Messenger Bag',
    price: 149.99,
    description: 'Professional leather messenger bag, perfect for work or travel.',
    category: 'bags',
    colors: ['Brown', 'Black'],
    imageUrl: '/m-bag.jpg'
  },
  {
    id: '5',
    name: 'Casual Canvas Shoes',
    price: 59.99,
    description: 'Comfortable and stylish canvas shoes for casual outings.',
    category: 'shoes',
    colors: ['White', 'Gray', 'Green'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/canvas-shoes.jpg'
  },
  {
    id: '6',
    name: 'High-Top Basketball Shoes',
    price: 109.99,
    description: 'Durable and supportive basketball shoes for the court.',
    category: 'shoes',
    colors: ['Black', 'Red', 'White'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/bb-shoes.jpg'
  },
  {
    id: '7',
    name: 'Minimalist Backpack',
    price: 99.99,
    description: 'Sleek and minimalist backpack for everyday use.',
    category: 'bags',
    colors: ['Black', 'Gray', 'Blue'],
    imageUrl: '/bb-bag2.jpg'
  },
  {
    id: '8',
    name: 'Waterproof Hiking Boots',
    price: 139.99,
    description: 'Rugged and waterproof boots for hiking adventures.',
    category: 'shoes',
    colors: ['Brown', 'Green'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/hb-shoes.jpg'
  },
  {
    id: '9',
    name: 'Designer Clutch Bag',
    price: 199.99,
    description: 'Elegant designer clutch bag for special occasions.',
    category: 'bags',
    colors: ['Gold', 'Silver', 'Black'],
    imageUrl: '/clutch-bag.jpg'
  },
  {
    id: '10',
    name: 'Slip-On Loafers',
    price: 79.99,
    description: 'Comfortable slip-on loafers for a relaxed yet stylish look.',
    category: 'shoes',
    colors: ['Brown', 'Black', 'Navy'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/l-shoes.jpg'
  },
  {
    id: '11',
    name: 'Weekender Duffle Bag',
    price: 129.99,
    description: 'Spacious duffle bag for short trips or gym sessions.',
    category: 'bags',
    colors: ['Black', 'Navy', 'Olive'],
    imageUrl: '/d-bag.png'
  },
  {
    id: '12',
    name: 'Formal Wingtip Shoes',
    price: 159.99,
    description: 'Classic wingtip shoes for formal and business settings.',
    category: 'shoes',
    colors: ['Black', 'Brown'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/w-shoes.jpg'
  },
  {
    id: '13',
    name: 'Crossbody Sling Bag',
    price: 69.99,
    description: 'Compact and stylish crossbody bag for hands-free convenience.',
    category: 'bags',
    colors: ['Black', 'Brown', 'Beige'],
    imageUrl: '/sling-bag.jpg'
  },
  {
    id: '14',
    name: 'Trail Running Shoes',
    price: 119.99,
    description: 'Durable and grippy shoes for trail running and outdoor adventures.',
    category: 'shoes',
    colors: ['Green', 'Orange', 'Black'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/t-shoes.jpg'
  },
  {
    id: '15',
    name: 'Leather Briefcase',
    price: 179.99,
    description: 'Professional leather briefcase for business and formal use.',
    category: 'bags',
    colors: ['Black', 'Brown'],
    imageUrl: '/bc-bag.jpg'
  },
  {
    id: '16',
    name: 'Slip-Resistant Work Shoes',
    price: 99.99,
    description: 'Durable and slip-resistant shoes for work environments.',
    category: 'shoes',
    colors: ['Black', 'Brown'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/sr-shoes.jpg'
  },
  {
    id: '17',
    name: 'Foldable Travel Bag',
    price: 89.99,
    description: 'Lightweight and foldable bag for travel and storage.',
    category: 'bags',
    colors: ['Blue', 'Gray', 'Black'],
    imageUrl: '/fold-bag.jpg'
  },
  {
    id: '18',
    name: 'Platform Sneakers',
    price: 109.99,
    description: 'Trendy platform sneakers for a bold and stylish look.',
    category: 'shoes',
    colors: ['White', 'Pink', 'Black'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/ps-shoes.jpg'
  },
  {
    id: '19',
    name: 'Laptop Backpack',
    price: 129.99,
    description: 'Functional and stylish backpack with a dedicated laptop compartment.',
    category: 'bags',
    colors: ['Black', 'Gray', 'Navy'],
    imageUrl: '/laptop-bag (1).jpg'
  },
  {
    id: '20',
    name: 'Casual Slip-On Sneakers',
    price: 69.99,
    description: 'Easy-to-wear slip-on sneakers for casual outings.',
    category: 'shoes',
    colors: ['Black', 'White', 'Blue'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    imageUrl: '/slip-on-shoes.jpg'
  }
];

export async function GET() {
  return NextResponse.json(products);
}

