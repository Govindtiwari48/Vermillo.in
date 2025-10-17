import { Product, Collection } from './types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'The Sculpture Garden',
    description: 'Handcrafted jewelry pieces inspired by natural forms',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    slug: 'sculpture-garden'
  },
  {
    id: '2',
    name: 'The Canvas Collection',
    description: 'Wearable art meets contemporary fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    slug: 'canvas-collection'
  },
  {
    id: '3',
    name: 'Urban Minimalist',
    description: 'Clean lines and timeless elegance',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    slug: 'urban-minimalist'
  },
  {
    id: '4',
    name: 'Artisan Accessories',
    description: 'Curated pieces to complete your look',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    slug: 'artisan-accessories'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Celestial Ring',
    price: 189,
    description: 'Hand-forged sterling silver ring inspired by celestial movements. Each piece is unique with subtle variations in texture.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    sizes: ['5', '6', '7', '8', '9'],
    material: 'Sterling Silver',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: '2',
    name: 'Linen Artisan Shirt',
    price: 245,
    description: 'Premium European linen shirt with hand-stitched details. Breathable and perfect for any season.',
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Natural', hex: '#EAE0D5' },
      { name: 'Charcoal', hex: '#333333' },
      { name: 'Sage', hex: '#556B2F' }
    ],
    material: 'European Linen',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: '3',
    name: 'Minimalist Tote',
    price: 165,
    description: 'Handcrafted leather tote with brass hardware. Vegetable-tanned leather ages beautifully over time.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
      'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=800&q=80'
    ],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#1a1a1a' }
    ],
    material: 'Vegetable-tanned Leather',
    inStock: true,
    trending: true
  },
  {
    id: '4',
    name: 'Abstract Canvas Print',
    price: 420,
    description: 'Limited edition giclée print on museum-quality canvas. Signed and numbered by the artist.',
    category: 'art',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80'
    ],
    sizes: ['18x24"', '24x36"', '36x48"'],
    material: 'Giclée on Canvas',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Wool Blend Coat',
    price: 520,
    description: 'Oversized wool blend coat with a relaxed fit. Italian fabric with exceptional drape.',
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1539533113708-7c9b0c2e3438?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    material: 'Italian Wool Blend',
    inStock: true,
    trending: true
  },
  {
    id: '6',
    name: 'Ceramic Vase Set',
    price: 285,
    description: 'Set of three handthrown ceramic vases with reactive glaze. Each piece is one-of-a-kind.',
    category: 'art',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80'
    ],
    material: 'Ceramic',
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Silk Scarf',
    price: 135,
    description: 'Hand-painted silk scarf with abstract botanical motifs. Each scarf is a wearable work of art.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
      'https://images.unsplash.com/photo-1591790561671-1f39afd5b9fa?w=800&q=80'
    ],
    colors: [
      { name: 'Blush', hex: '#FFC0CB' },
      { name: 'Sage', hex: '#556B2F' },
      { name: 'Terracotta', hex: '#E2725B' }
    ],
    material: 'Pure Silk',
    inStock: true,
    trending: true
  },
  {
    id: '8',
    name: 'Wide Leg Trousers',
    price: 295,
    description: 'High-waisted wide leg trousers in premium cotton twill. Tailored for an elegant silhouette.',
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
      'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800&q=80'
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Black', hex: '#000000' },
      { name: 'Olive', hex: '#556B2F' }
    ],
    material: 'Cotton Twill',
    inStock: true
  }
];

