// Image lists for customized collection categories
// Each array contains all image paths for the respective category

export const todeBagImages = [
    '/images/tode-bag/blue_multieye.jpeg',
    '/images/tode-bag/Dollar_tode.jpeg',
    '/images/tode-bag/fish_tode_bag.jpeg',
    '/images/tode-bag/open_mouth_unicorn_tode.jpeg',
    '/images/tode-bag/teeth_cock_tode.jpeg',
    '/images/tode-bag/time-juyptor_tode.jpeg',
];

export const artWearImages = [
    '/images/painted-clothes/close-up-hand-painting-with-brush.jpg',
    '/images/painted-clothes/close-up-hand-sponge-painting.jpg',
    '/images/painted-clothes/painted-clothes.jpg',
];

export const leatherShoeImages = [
    '/images/shoe/men-shoes.jpg',
    '/images/shoe/pair-brown-shoes-with-black-leather-sole-word-bottom.jpg',
    '/images/shoe/sample_shoe.jpeg',
];

export const paintingImages = [
    '/images/painting/autism-day-awareness-collage-style-with-people.jpg',
    '/images/painting/Butterfly_canva_painting.png',
    '/images/painting/canva_painting_flower_1.jpeg',
    '/images/painting/couple_ocean_painting.jpeg',
    '/images/painting/Hand_Drawing_raj.jpeg',
    '/images/painting/Horse_canva_painting_raj.jpeg',
    '/images/painting/No_dead_pot_canva_painting.png',
    '/images/painting/side_hug_couple_canva_painting.png',
    '/images/painting/yellow_canva_painting_0.png',
];

export const sketchImages = [
    '/images/sketch/Beautiful_eye_closdshoot_sketch.png',
    '/images/sketch/big_model_sketch.png',
    '/images/sketch/dadi_2_sketch.png',
    '/images/sketch/dadi_3_sketch.jpeg',
    '/images/sketch/Dark_closed_eye_dadi_sketch.png',
    '/images/sketch/Dark_face_character_sketch.jpeg',
    '/images/sketch/Dark_hand_on_mouth_dadi_sketch.jpeg',
    '/images/sketch/eye_sketch.jpeg',
    '/images/sketch/hero_mood_sketch.jpeg',
    '/images/sketch/Lips_geometric_sketch.jpeg',
    '/images/sketch/merchant_sketch.png',
    '/images/sketch/notes_band_sketch.png',
    '/images/sketch/Witcher_sketch.jpeg',
    '/images/sketch/work_sketch_good.jpeg',
];

export interface CustomizedCategory {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
    images: string[];
}

// Combine all images for the "all" view
export const allImages = [
    ...todeBagImages,
    ...artWearImages,
    ...leatherShoeImages,
    ...paintingImages,
    ...sketchImages,
];

export const customizedCategories: CustomizedCategory[] = [
    {
        id: 'tode-bag',
        name: 'Exclusive Tode Bag',
        description: 'Handcrafted exclusive tode bags with unique designs',
        image: '/images/tode-bag/open_mouth_unicorn_tode.jpeg',
        slug: 'tode-bag',
        images: todeBagImages,
    },
    {
        id: 'art-wear',
        name: 'Art Wear Collection',
        description: 'Hand-painted clothing and wearable art pieces',
        image: '/images/painted-clothes/painted-clothes.jpg',
        slug: 'art-wear',
        images: artWearImages,
    },
    {
        id: 'leather-shoe',
        name: 'Leather Shoe',
        description: 'Premium handcrafted leather footwear',
        image: '/images/shoe/men-shoes.jpg',
        slug: 'leather-shoe',
        images: leatherShoeImages,
    },
    {
        id: 'painting',
        name: 'Painting',
        description: 'Original canvas paintings and artwork',
        image: '/images/painting/Horse_canva_painting_raj.jpeg',
        slug: 'painting',
        images: paintingImages,
    },
    {
        id: 'sketch',
        name: 'Sketch',
        description: 'Detailed hand-drawn sketches and illustrations',
        image: '/images/sketch/hero_mood_sketch.jpeg',
        slug: 'sketch',
        images: sketchImages,
    },
];

