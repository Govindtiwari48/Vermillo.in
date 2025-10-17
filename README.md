# The Artisan Collective

A hyper-dynamic, visually stunning e-commerce website for a high-end brand selling curated art, artisanal clothing, and unique accessories.

## Features

✨ **Stunning Hero Section** with particle text animation and parallax effects
🛍️ **Product Catalog** with advanced filtering and sorting
🖼️ **Product Detail Pages** with zoom-on-hover image gallery
🛒 **Dynamic Shopping Cart** with slide-out panel
💳 **Multi-step Checkout** with progress tracking
📱 **Fully Responsive** design for all devices
🎨 **Beautiful UI/UX** with smooth animations using Framer Motion

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
artisan-collective/
├── app/                      # Next.js App Router pages
│   ├── collections/         # Product collection pages
│   ├── products/            # Product detail pages
│   ├── checkout/            # Checkout flow
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── hero/               # Hero section with particles
│   ├── home/               # Homepage sections
│   ├── products/           # Product components
│   ├── cart/               # Shopping cart
│   └── ui/                 # UI components
└── lib/                     # Utilities and data
    ├── types.ts            # TypeScript types
    ├── mockData.ts         # Sample product data
    └── cartContext.tsx     # Cart state management
```

## Design System

### Colors
- **Primary**: Off-white (#F8F8F8)
- **Charcoal**: #333333
- **Beige**: #EAE0D5
- **Sage Green** (Accent): #556B2F
- **Burnt Sienna**: #E97451

### Typography
- **Serif**: Playfair Display (Headlines)
- **Sans-serif**: Inter (Body text)

## Key Pages

1. **Homepage** (`/`) - Hero section, featured collections, trending products, brand manifesto
2. **Collections** (`/collections/[slug]`) - Filtered product listings with sorting
3. **Product Detail** (`/products/[id]`) - Full product information with image gallery
4. **Checkout** (`/checkout`) - Multi-step checkout process

## Customization

### Adding Products

Edit `lib/mockData.ts` to add or modify products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 199,
  description: 'Product description...',
  category: 'art' | 'clothing' | 'accessories',
  images: ['url1', 'url2'],
  // ... other properties
}
```

### Modifying Design

- Colors: Update CSS variables in `app/globals.css`
- Components: Modify files in `components/`
- Animations: Adjust Framer Motion props

## Performance

- ✅ Optimized images with Next.js Image component
- ✅ Code splitting with dynamic imports
- ✅ Smooth 60fps animations
- ✅ Lazy loading for improved performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is a demo and is provided as-is for educational purposes.

---

Built with ❤️ for exceptional user experiences.
