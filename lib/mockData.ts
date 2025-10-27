import { Product, Collection } from './types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Featured Collection',
    description: 'Explore our curated collections',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&h=1600',
    slug: 'collections'
  },
  {
    id: '2',
    name: 'Canvas Art',
    description: 'Handcrafted canvas artwork',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&h=800',
    slug: 'art'
  },
  {
    id: '3',
    name: 'Designer Saree',
    description: 'Artistic hand-painted sarees',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&h=800',
    slug: 'clothing'
  },
  {
    id: '4',
    name: 'Leather Shoes',
    description: 'Premium handcrafted footwear',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&h=800',
    slug: 'accessories'
  },
  {
    id: '5',
    name: 'Paintings',
    description: 'Original artwork collection',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&h=800',
    slug: 'art'
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
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=800'
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
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&h=800'
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
    name: 'Leather Tote Bag',
    price: 165,
    description: 'Handcrafted leather tote with brass hardware. Vegetable-tanned leather ages beautifully over time.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&h=800'
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
      'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=600&h=800'
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
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&h=800'
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
    name: 'Handmade Ceramic Vases',
    price: 285,
    description: 'Set of three handthrown ceramic vases with reactive glaze. Each piece is one-of-a-kind.',
    category: 'art',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600&h=800'
    ],
    material: 'Ceramic',
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Silk Designer Scarf',
    price: 135,
    description: 'Hand-painted silk scarf with abstract botanical motifs. Each scarf is a wearable work of art.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&h=800'
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
    name: 'Premium Leather Shoes',
    price: 395,
    description: 'Handcrafted leather oxford shoes with Goodyear welt construction. Made in Italy with premium full-grain leather.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&h=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Black', hex: '#000000' },
      { name: 'Tan', hex: '#D2B48C' }
    ],
    material: 'Full-Grain Leather',
    inStock: true,
    trending: true
  },
  {
    id: '9',
    name: 'Designer Fashion Dress',
    price: 345,
    description: 'Elegant midi dress in premium silk blend. Timeless design with modern sophistication.',
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=600&h=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    material: 'Silk Blend',
    inStock: true,
    featured: true
  },
  {
    id: '10',
    name: 'Handcrafted Leather Duffel',
    price: 485,
    description: 'Vintage-style leather duffel bag with solid brass hardware. Perfect for weekend getaways.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&h=800'
    ],
    colors: [
      { name: 'Cognac', hex: '#9F5240' },
      { name: 'Dark Brown', hex: '#654321' }
    ],
    material: 'Full-Grain Leather',
    inStock: true,
    trending: true,
    featured: true
  },
  {
    id: '11',
    name: 'Abstract Wall Art',
    price: 580,
    description: 'Original acrylic painting on canvas. Bold contemporary design by emerging artist.',
    category: 'art',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&h=800'
    ],
    sizes: ['24x36"', '36x48"', '48x60"'],
    material: 'Acrylic on Canvas',
    inStock: true,
    featured: true
  },
  {
    id: '12',
    name: 'Minimalist Sketch Collection',
    price: 220,
    description: 'Set of three framed minimalist sketches. Museum-quality paper with archival ink.',
    category: 'art',
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&h=800',
      'https://images.unsplash.com/photo-1582561924811-71c32f7d1219?q=80&w=600&h=800'
    ],
    sizes: ['12x16"', '16x20"'],
    material: 'Archival Paper',
    inStock: true,
    trending: true
  }
];

