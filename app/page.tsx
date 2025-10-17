import HeroSection from '@/components/hero/HeroSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import TrendingProducts from '@/components/home/TrendingProducts';
import BrandManifesto from '@/components/home/BrandManifesto';
import ShopByCategory from '@/components/home/ShopByCategory';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <TrendingProducts />
      <BrandManifesto />
      <ShopByCategory />
    </>
  );
}
