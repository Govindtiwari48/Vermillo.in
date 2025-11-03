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
  // ========================================
  // PAINTING PRODUCTS
  // ========================================
  {
    id: 'paint-001',
    name: 'Majestic Horse Canvas Painting',
    price: 389,
    description: 'Vibrant canvas painting showcasing the majestic beauty of a horse. Rich, expressive brushstrokes capture strength and grace in dynamic composition. Original statement artwork.',
    category: 'painting',
    images: ['/images/painting/Horse_canva_painting_raj.jpeg'],
    sizes: ['12x16"', '16x20"', '20x24"'],
    material: 'Premium Canvas with Acrylic Paint',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'paint-002',
    name: 'Romantic Couple Ocean Painting',
    price: 365,
    description: 'Serene romantic depiction of a couple by the ocean. Evocative artwork captures intimate connection with soft color palette and gentle brushstrokes. Calming emotional piece.',
    category: 'painting',
    images: ['/images/painting/couple_ocean_painting.jpeg'],
    sizes: ['16x20"', '20x24"', '24x30"'],
    material: 'Canvas with Mixed Media',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'paint-003',
    name: 'Vibrant Butterfly Canvas Art',
    price: 235,
    description: 'Hand-painted canvas featuring a vibrant monarch butterfly. Rich orange and black wing patterns with delicate white accents create a stunning nature-inspired piece. Perfect statement artwork for any modern interior.',
    category: 'painting',
    images: ['/images/painting/Butterfly_canva_painting.png'],
    sizes: ['10x12"', '12x16"', '16x20"'],
    material: 'Premium Canvas with Acrylic Paint',
    inStock: true,
    trending: true
  },
  {
    id: 'paint-004',
    name: 'Sunny Yellow Canvas Painting',
    price: 485,
    description: 'Expressive yellow canvas radiating warmth and energy. Bold abstract piece with vibrant tones creates dynamic, uplifting visual. Perfect for modern interiors seeking vibrant color.',
    category: 'painting',
    images: ['/images/painting/yellow_canva_painting_0.png'],
    sizes: ['18x24"', '24x30"', '30x36"'],
    material: 'Premium Canvas with Acrylic',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'paint-005',
    name: 'Hand Drawing Portrait',
    price: 425,
    description: 'An exquisite hand-drawn portrait showcasing incredible attention to detail and skillful rendering. This portrait demonstrates the artist\'s mastery of form, light, and expression. Each stroke captures the essence of the subject with remarkable precision and emotional depth.',
    category: 'painting',
    images: ['/images/painting/Hand_Drawing_raj.jpeg'],
    sizes: ['14x18"', '18x24"', '24x30"'],
    material: 'Canvas with Graphite and Charcoal',
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'paint-006',
    name: 'Tender Side Hug Couple',
    price: 395,
    description: 'Tender intimate painting of a couple in side embrace. Heartfelt artwork conveys warmth and connection through soft, flowing brushstrokes. Cherished piece for couples.',
    category: 'painting',
    images: ['/images/painting/side_hug_couple_canva_painting.png'],
    sizes: ['16x20"', '20x24"', '24x30"'],
    material: 'Canvas with Acrylic Paint',
    inStock: true,
    trending: true
  },
  {
    id: 'paint-007',
    name: 'Floral Canvas Painting',
    price: 275,
    description: 'A beautiful floral canvas painting that celebrates nature\'s delicate beauty. Rich in color and texture, this piece brings the garden indoors with its vibrant blooms and organic compositions. Perfect for adding natural elegance to your living space.',
    category: 'painting',
    images: ['/images/painting/canva_painting_flower_1.jpeg'],
    sizes: ['12x16"', '16x20"', '20x24"'],
    material: 'Canvas with Acrylic Paint',
    inStock: true,
    trending: false
  },
  {
    id: 'paint-008',
    name: 'Autism Awareness Collage',
    price: 445,
    description: 'A meaningful and powerful collage-style painting created for autism awareness. This thoughtful artwork combines multiple elements and styles to convey a message of understanding, acceptance, and celebration of neurodiversity. A portion of proceeds supports autism awareness initiatives.',
    category: 'painting',
    images: ['/images/painting/autism-day-awareness-collage-style-with-people.jpg'],
    sizes: ['20x24"', '24x30"', '30x36"'],
    material: 'Canvas with Mixed Media Collage',
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'paint-009',
    name: 'No Dead Pot Canvas Art',
    price: 315,
    description: 'A unique and thought-provoking canvas painting featuring a "no dead pot" theme. This artistic piece challenges traditional perspectives with its creative composition and symbolic imagery. The artwork invites viewers to contemplate renewal, growth, and resilience.',
    category: 'painting',
    images: ['/images/painting/No_dead_pot_canva_painting.png'],
    sizes: ['14x18"', '18x24"', '24x30"'],
    material: 'Canvas with Acrylic Paint',
    inStock: true,
    trending: false
  },
  // ========================================
  // SKETCH PRODUCTS
  // ========================================
  {
    id: 'sketch-001',
    name: 'Hero Mood Sketch',
    price: 220,
    description: 'Powerful dramatic sketch capturing raw emotion and intensity. Detailed pencil work showcases exceptional skill in facial expressions and character depth. Perfect for art collectors.',
    category: 'sketch',
    images: ['/images/sketch/hero_mood_sketch.jpeg'],
    sizes: ['11x14"', '14x17"', '17x22"'],
    material: 'Premium Paper with Graphite Pencil',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'sketch-002',
    name: 'Dark Closed Eye Portrait',
    price: 245,
    description: 'Intimate contemplative sketch with dark-themed portrait. Emotionally rich piece exploring introspection and inner peace. Expert shading creates depth and mystery.',
    category: 'sketch',
    images: ['/images/sketch/Dark_closed_eye_dadi_sketch.png'],
    sizes: ['10x12"', '12x16"', '16x20"'],
    material: 'Archival Paper with Charcoal and Graphite',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'sketch-003',
    name: 'The Witcher Character Sketch',
    price: 285,
    description: 'A masterful character sketch inspired by The Witcher series. This detailed portrait captures the essence of the character with exceptional attention to facial features, expression, and character design. A must-have for fantasy art enthusiasts.',
    category: 'sketch',
    images: ['/images/sketch/Witcher_sketch.jpeg'],
    sizes: ['11x14"', '14x17"', '17x22"'],
    material: 'Premium Drawing Paper with Graphite',
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'sketch-004',
    name: 'Beautiful Eye Close-Up',
    price: 195,
    description: 'Stunning close-up sketch of the human eye. Hyper-realistic piece with incredible detail, capturing every lash and reflection. Testament to technical mastery.',
    category: 'sketch',
    images: ['/images/sketch/Beautiful_eye_closdshoot_sketch.png'],
    sizes: ['8x10"', '10x12"', '12x14"'],
    material: 'Fine Art Paper with Graphite Pencil',
    inStock: true,
    trending: true
  },
  {
    id: 'sketch-005',
    name: 'Dadi Portrait Series - Variation 2',
    price: 225,
    description: 'A compelling portrait from the Dadi series, showcasing the artist\'s ability to capture character and emotion. This sketch celebrates the wisdom and strength found in elderly subjects, rendered with respect and artistic sensitivity.',
    category: 'sketch',
    images: ['/images/sketch/dadi_2_sketch.png'],
    sizes: ['10x12"', '12x16"', '16x20"'],
    material: 'Drawing Paper with Charcoal',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-006',
    name: 'Dadi Portrait Series - Variation 3',
    price: 235,
    description: 'Another striking portrait from the Dadi collection, highlighting the expressive lines and character of the subject. The artist\'s skillful use of light and shadow brings depth and dimension to this emotional portrait.',
    category: 'sketch',
    images: ['/images/sketch/dadi_3_sketch.jpeg'],
    sizes: ['10x12"', '12x16"', '16x20"'],
    material: 'Art Paper with Charcoal and Graphite',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-007',
    name: 'Dark Face Character Study',
    price: 265,
    description: 'A dramatic character study featuring a dark-toned portrait. This powerful sketch explores mood, lighting, and character expression through expert use of contrast and shading. Perfect for art collectors who appreciate bold, expressive work.',
    category: 'sketch',
    images: ['/images/sketch/Dark_face_character_sketch.jpeg'],
    sizes: ['11x14"', '14x17"', '17x22"'],
    material: 'Premium Paper with Charcoal',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-008',
    name: 'Dark Hand on Mouth Portrait',
    price: 250,
    description: 'An evocative portrait capturing a hand-on-mouth gesture, expressing emotion and mystery. This thoughtful composition combines detailed hand study with expressive facial work, creating a narrative-rich piece that invites interpretation.',
    category: 'sketch',
    images: ['/images/sketch/Dark_hand_on_mouth_dadi_sketch.jpeg'],
    sizes: ['12x16"', '16x20"', '20x24"'],
    material: 'Archival Paper with Graphite and Charcoal',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-009',
    name: 'Expressive Eye Sketch',
    price: 180,
    description: 'A detailed eye sketch showcasing the artist\'s ability to capture expression and emotion. This focused study highlights the beauty and complexity of the human eye through precise line work and expert shading.',
    category: 'sketch',
    images: ['/images/sketch/eye_sketch.jpeg'],
    sizes: ['8x10"', '10x12"', '12x14"'],
    material: 'Fine Art Paper with Graphite',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-010',
    name: 'Geometric Lips Art',
    price: 195,
    description: 'A unique geometric interpretation of lips, combining realism with abstract geometric patterns. This creative sketch merges organic forms with structured design elements, creating a contemporary and stylized portrait piece.',
    category: 'sketch',
    images: ['/images/sketch/Lips_geometric_sketch.jpeg'],
    sizes: ['9x12"', '12x16"', '16x20"'],
    material: 'Drawing Paper with Graphite and Ink',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-011',
    name: 'Merchant Character Portrait',
    price: 275,
    description: 'A detailed character portrait of a merchant, showcasing exceptional ability to capture personality and profession through portraiture. The sketch tells a story through expression, clothing details, and character design.',
    category: 'sketch',
    images: ['/images/sketch/merchant_sketch.png'],
    sizes: ['11x14"', '14x17"', '17x22"'],
    material: 'Premium Paper with Graphite',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-012',
    name: 'Musical Notes Band Sketch',
    price: 260,
    description: 'A dynamic sketch featuring a band with musical notes, combining music and art in perfect harmony. This energetic composition captures the rhythm and energy of musical performance through expressive line work and movement.',
    category: 'sketch',
    images: ['/images/sketch/notes_band_sketch.png'],
    sizes: ['12x16"', '16x20"', '20x24"'],
    material: 'Art Paper with Graphite and Charcoal',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-013',
    name: 'Fashion Model Portrait',
    price: 240,
    description: 'A sophisticated fashion model portrait sketch that captures elegance and style. This refined piece showcases the artist\'s understanding of fashion illustration and portrait art, perfect for fashion enthusiasts and art collectors.',
    category: 'sketch',
    images: ['/images/sketch/big_model_sketch.png'],
    sizes: ['11x14"', '14x17"', '17x22"'],
    material: 'Drawing Paper with Graphite',
    inStock: true,
    trending: false
  },
  {
    id: 'sketch-014',
    name: 'Work Study Sketch',
    price: 225,
    description: 'A detailed work study sketch showcasing the artist\'s dedication to observation and detail. This piece demonstrates professional-level drawing skills and attention to form, light, and composition. A valuable addition to any art collection.',
    category: 'sketch',
    images: ['/images/sketch/work_sketch_good.jpeg'],
    sizes: ['12x16"', '16x20"', '20x24"'],
    material: 'Premium Drawing Paper with Graphite',
    inStock: true,
    trending: false
  },
  // ========================================
  // BAG PRODUCTS (TODE BAGS)
  // ========================================
  {
    id: 'tode-001',
    name: 'Dollar Sign Tode Bag',
    price: 420,
    description: 'Bold statement bag featuring iconic dollar sign design. Handcrafted with premium canvas, this unique piece combines functionality with artistic expression.',
    category: 'bag',
    images: ['/images/tode-bag/Dollar_tode.jpeg'],
    material: 'Premium Handcrafted Canvas',
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'tode-002',
    name: 'Time Journey Tode Bag',
    price: 520,
    description: 'Extraordinary hand-painted bag featuring Jupiter and celestial themes. Each detail tells a story of cosmic exploration. One-of-a-kind wearable art piece.',
    category: 'bag',
    images: ['/images/tode-bag/time-juyptor_tode.jpeg'],
    material: 'Artisan Canvas with Hand-Painted Design',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'tode-003',
    name: 'Blue Multi-Eye Tode Bag',
    price: 485,
    description: 'Mesmerizing multi-eye design in vibrant blue tones. Surreal artistic piece that transforms functional bags into wearable art. Distinctive conversation-starting accessory.',
    category: 'bag',
    images: ['/images/tode-bag/blue_multieye.jpeg'],
    material: 'Premium Canvas with Hand-Painted Art',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'tode-004',
    name: 'Unicorn Fantasy Tode Bag',
    price: 550,
    description: 'Whimsical unicorn design brings magic to everyday carry. Fantasy-inspired hand-painted artwork on premium canvas. Perfect for those who embrace playful, artistic fashion.',
    category: 'bag',
    images: ['/images/tode-bag/open_mouth_unicorn_tode.jpeg'],
    material: 'Artisan Canvas with Vibrant Hand-Painting',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'tode-005',
    name: 'Ocean Fish Tode Bag',
    price: 445,
    description: 'Oceanic-themed bag with detailed hand-painted fish design. Nature-inspired artwork brings marine beauty to everyday carry. Unique, eye-catching artisan piece.',
    category: 'bag',
    images: ['/images/tode-bag/fish_tode_bag.jpeg'],
    material: 'Premium Canvas with Hand-Painted Marine Art',
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'tode-006',
    name: 'Rooster Teeth Tode Bag',
    price: 475,
    description: 'Bold rooster design with surreal artistic elements. Combines animal imagery with unique creative vision. Distinctive handcrafted accessory for unconventional art lovers.',
    category: 'bag',
    images: ['/images/tode-bag/teeth_cock_tode.jpeg'],
    material: 'Handcrafted Canvas with Artistic Design',
    inStock: true,
    featured: false,
    trending: false
  },
  // ========================================
  // SHOE PRODUCTS
  // ========================================
  {
    id: 'shoe-001',
    name: 'Premium Men\'s Leather Shoes',
    price: 395,
    description: 'Handcrafted premium leather oxfords with classic design and modern comfort. High-quality construction with traditional craftsmanship. Perfect for formal and everyday wear.',
    category: 'shoe',
    images: ['/images/shoe/men-shoes.jpg'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Black', hex: '#000000' }
    ],
    material: 'Premium Full-Grain Leather',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'shoe-002',
    name: 'Classic Brown Leather Shoes',
    price: 425,
    description: 'Sophisticated brown leather shoes with black leather sole and word bottom detailing. These elegant oxfords combine timeless style with excellent craftsmanship. The rich brown color and quality construction make them a versatile addition to any wardrobe.',
    category: 'shoe',
    images: ['/images/shoe/pair-brown-shoes-with-black-leather-sole-word-bottom.jpg'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Tan', hex: '#D2B48C' }
    ],
    material: 'Premium Leather with Leather Sole',
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'shoe-003',
    name: 'Sample Designer Shoes',
    price: 445,
    description: 'A sample collection of designer shoes showcasing exceptional craftsmanship and style. These carefully curated footwear pieces represent the pinnacle of artisanal shoe making, combining comfort, durability, and aesthetic appeal.',
    category: 'shoe',
    images: ['/images/shoe/sample_shoe.jpeg'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    material: 'Premium Leather',
    inStock: true,
    featured: false,
    trending: false
  },
  // ========================================
  // ART-WEAR PRODUCTS
  // ========================================
  {
    id: 'artwear-001',
    name: 'Hand-Painted Artwear Collection',
    price: 385,
    description: 'Hand-painted clothing with unique artistic designs. Each piece individually created by skilled artists. Vibrant colors transform garments into wearable art canvases.',
    category: 'art-wear',
    images: ['/images/painted-clothes/painted-clothes.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Multi-Color', hex: '#FF6B6B' },
      { name: 'Artistic Blend', hex: '#4ECDC4' }
    ],
    material: 'Premium Cotton with Hand-Painted Design',
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'artwear-002',
    name: 'Brush Technique Artwear',
    price: 355,
    description: 'Artistic clothing featuring close-up brush painting techniques. This piece showcases the artistry and skill involved in hand-painting garments. The visible brushstrokes add texture and character, creating a unique wearable art experience.',
    category: 'art-wear',
    images: ['/images/painted-clothes/close-up-hand-painting-with-brush.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Artistic Blend', hex: '#6C5CE7' }
    ],
    material: 'Canvas Fabric with Acrylic Paint',
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'artwear-003',
    name: 'Sponge Painting Artwear',
    price: 365,
    description: 'Unique clothing featuring close-up sponge painting techniques. This artistic method creates distinctive textures and patterns that are impossible to replicate. Each piece is a testament to the artist\'s creativity and the beauty of handmade techniques.',
    category: 'art-wear',
    images: ['/images/painted-clothes/close-up-hand-sponge-painting.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Premium Textile with Hand-Sponge-Painted Design',
    inStock: true,
    featured: false,
    trending: false
  },
];
