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
    slug: 'customized'
  },
  {
    id: '2',
    name: 'Exclusive Tode Bag',
    description: 'Handcrafted exclusive tode bag',
    image: getImage(
      IMAGE_CONFIG.collections.canvasArt,
      '/images/tode-bag/fish_tode_bag.jpeg'
    ),
    slug: 'customized/tode-bag'
  },
  {
    id: '3',
    name: 'Artwear',
    description: 'Artistic hand-painted sarees',
    image: getImage(
      IMAGE_CONFIG.collections.designerSaree,
      '/images/painted-clothes/painted-clothes.jpg'
    ),
    slug: 'customized/art-wear'
  },
  {
    id: '4',
    name: 'Leather Shoes',
    description: 'Premium handcrafted footwear',
    image: getImage(
      IMAGE_CONFIG.collections.leatherShoes,
      '/images/shoe/men-shoes.jpg'
    ),
    slug: 'customized/leather-shoe'
  },
  {
    id: '5',
    name: 'Paintings',
    description: 'Original artwork collection',
    image: getImage(
      IMAGE_CONFIG.collections.paintings,
      '/images/painting/Horse_canva_painting_raj.jpeg'
    ),
    slug: 'customized/painting'
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
    name: 'Dark Closed Eye Dadi Sketch',
    price: 245,
    description: 'Hand-painted sketch by the artist.',
    category: 'clothing',
    images: [
      getImage(IMAGE_CONFIG.products.linenShirt, '/images/sketch/Dark_closed_eye_dadi_sketch.png'),
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
    name: 'Witcher Sketch',
    price: 285,
    description: 'Hand-painted sketch by the artist.',
    category: 'art',
    images: [
      getImage(IMAGE_CONFIG.products.ceramicVases, '/images/sketch/Witcher_sketch.jpeg'),
    ],
    material: 'Ceramic',
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Butterfly Canva Painting',
    price: 135,
    description: 'Hand-painted butterfly canva painting by the artist.',
    category: 'accessories',
    images: [
      getImage(IMAGE_CONFIG.products.silkScarf, '/images/painting/Butterfly_canva_painting.png'),
    ],
    material: 'Canvas',
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
    name: 'Blue Multi-Eye Tode Bag',
    price: 345,
    description: 'Handcrafted exclusive tode bag.',
    category: 'clothing',
    images: [
      getImage(IMAGE_CONFIG.products.fashionDress, '/images/tode-bag/blue_multieye.jpeg'),
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Tode Bag',
    inStock: true,
    featured: true
  },
  {
    id: '10',
    name: 'Yellow Canva Painting',
    price: 485,
    description: 'Hand-painted yellow canva painting by the artist.',
    category: 'accessories',
    images: [
      getImage(IMAGE_CONFIG.products.leatherDuffel, '/images/painting/yellow_canva_painting_0.png'),
    ],
    material: 'Canvas',
    inStock: true,
    trending: true,
    featured: true
  },
  {
    id: '11',
    name: 'Blue Multi-Eye Tode Bag',
    price: 580,
    description: 'Handcrafted exclusive tode bag.',
    category: 'art',
    images: [
      getImage(IMAGE_CONFIG.products.abstractWallArt, '/images/tode-bag/blue_multieye.jpeg'),
    ],
    sizes: ['24x36"', '36x48"', '48x60"'],
    material: 'Tode Bag',
    inStock: true,
    featured: true
  },
  {
    id: '12',
    name: 'Hero Mood Sketch',
    price: 220,
    description: 'Hand-painted hero mood sketch by the artist.',
    category: 'art',
    images: [
      getImage(IMAGE_CONFIG.products.minimalistSketches, '/images/sketch/hero_mood_sketch.jpeg'),
    ],
    sizes: ['12x16"', '16x20"'],
    material: 'Sketch',
    inStock: true,
    trending: true
  }
];

