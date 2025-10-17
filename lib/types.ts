export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'art' | 'clothing' | 'accessories';
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  material?: string;
  inStock: boolean;
  featured?: boolean;
  trending?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface FilterOptions {
  categories: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  priceRange: [number, number];
  materials: string[];
}

