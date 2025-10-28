import { Product, Collection } from './types';

// ========================================
// IMAGE CONFIGURATION
// ========================================
// To use your own images:
// 1. Place your images in the /public/images/ directory (or any subfolder you prefer)
// 2. Replace the empty strings below with the image paths
//    - Example: '/images/collections/featured.jpg'
//    - Or: '/images/products/celestial-ring.jpg'
// 3. Supported formats: .jpg, .jpeg, .png, .webp
// 4. Leave empty strings to use default Unsplash images
// ========================================
// IMPORTANT: Image paths should start with '/' 
// and be relative to the /public folder
// ========================================

const IMAGE_CONFIG = {
  collections: {
    featured: '', // Featured Collection (large image on left)
    canvasArt: '', // Canvas Art collection
    designerSaree: '', // Designer Saree collection  
    leatherShoes: '', // Leather Shoes collection
    paintings: '', // Paintings collection
  },
  products: {
    celestialRing: '', // Celestial Ring product
    linenShirt: '', // Linen Artisan Shirt product
    leatherTote: '', // Leather Tote Bag product
    abstractCanvas: '', // Abstract Canvas Print product
    woolCoat: '', // Wool Blend Coat product
    ceramicVases: '', // Handmade Ceramic Vases product
    silkScarf: '', // Silk Designer Scarf product
    leatherShoes: '', // Premium Leather Shoes product
    fashionDress: '', // Designer Fashion Dress product
    leatherDuffel: '', // Handcrafted Leather Duffel product
    abstractWallArt: '', // Abstract Wall Art product
    minimalistSketches: '', // Minimalist Sketch Collection product
  }
};

// Helper function to get image path with fallback
const getImage = (customPath: string, defaultPath: string) => {
  return customPath || defaultPath;
};

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Customized Collection',
    description: 'Explore our curated collections',
    image: getImage(
      IMAGE_CONFIG.collections.featured,
      '/images/tode-bag/open_mouth_unicorn_tode.jpeg'
    ),
    slug: 'collections'
  },
  {
    id: '2',
    name: 'Exclusive Tode Bag',
    description: 'Handcrafted exclusive tode bag',
    image: getImage(
      IMAGE_CONFIG.collections.canvasArt,
      '/images/tode-bag/fish_tode_bag.jpeg'
    ),
    slug: 'art'
  },
  {
    id: '3',
    name: 'Artwear',
    description: 'Artistic hand-painted sarees',
    image: getImage(
      IMAGE_CONFIG.collections.designerSaree,
      '/images/painted-clothes/painted-clothes.jpg'
    ),
    slug: 'clothing'
  },
  {
    id: '4',
    name: 'Leather Shoes',
    description: 'Premium handcrafted footwear',
    image: getImage(
      IMAGE_CONFIG.collections.leatherShoes,
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&h=800'
    ),
    slug: 'accessories'
  },
  {
    id: '5',
    name: 'Paintings',
    description: 'Original artwork collection',
    image: getImage(
      IMAGE_CONFIG.collections.paintings,
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&h=800'
    ),
    slug: 'art'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Canvas Painting',
    price: 189,
    description: 'Hand-painted canvas painting by the artist.',
    category: 'accessories',
    images: [
      getImage(IMAGE_CONFIG.products.celestialRing, '/images/painting/Horse_canva_painting_raj.jpeg'),
    ],
    sizes: ['5', '6', '7', '8', '9'],
    material: 'Canvas',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: '2',
    name: 'Handpainted Sketch',
    price: 245,
    description: 'Hand-painted sketch by the artist.',
    category: 'clothing',
    images: [
      getImage(IMAGE_CONFIG.products.linenShirt, '/images/sketch/eye_sketch.jpeg'),
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Natural', hex: '#EAE0D5' },
      { name: 'Charcoal', hex: '#333333' },
      { name: 'Sage', hex: '#556B2F' }
    ],
    material: 'Sketch',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: '3',
    name: 'Couple Ocean Painting',
    price: 165,
    description: 'Hand-painted couple ocean painting by the artist.',
    category: 'accessories',
    images: [
      getImage(IMAGE_CONFIG.products.leatherTote, '/images/painting/couple_ocean_painting.jpeg'),
    ],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#1a1a1a' }
    ],
    material: 'Canvas',
    inStock: true,
    trending: true
  },
  {
    id: '4',
    name: 'Dollar Tode Bag',
    price: 420,
    description: 'Handcrafted exclusive tode bag.',
    category: 'art',
    images: [
      getImage(IMAGE_CONFIG.products.abstractCanvas, '/images/tode-bag/Dollar_tode.jpeg'),
    ],
    sizes: ['18x24"', '24x36"', '36x48"'],
    material: 'Tode Bag',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Time Journey Tode Bag',
    price: 520,
    description: 'Handcrafted exclusive tode bag.',
    category: 'clothing',
    images: [
      getImage(IMAGE_CONFIG.products.woolCoat, '/images/tode-bag/time-juyptor_tode.jpeg'),
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    material: 'Tode Bag',
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
      getImage(IMAGE_CONFIG.products.ceramicVases, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&h=800'),
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
      getImage(IMAGE_CONFIG.products.silkScarf, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&h=800'),
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
      getImage(IMAGE_CONFIG.products.leatherShoes, 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&h=800'),
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
      getImage(IMAGE_CONFIG.products.fashionDress, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&h=800'),
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
      getImage(IMAGE_CONFIG.products.leatherDuffel, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&h=800'),
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
      getImage(IMAGE_CONFIG.products.abstractWallArt, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&h=800'),
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
      getImage(IMAGE_CONFIG.products.minimalistSketches, 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&h=800'),
      'https://images.unsplash.com/photo-1582561924811-71c32f7d1219?q=80&w=600&h=800'
    ],
    sizes: ['12x16"', '16x20"'],
    material: 'Archival Paper',
    inStock: true,
    trending: true
  }
];

