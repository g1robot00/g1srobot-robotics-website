// 랜딩페이지 ISR로 sEO
import HeroSection from '@/components/pages/main/HeroSection';
import IndustrySection from '@/components/pages/main/IndustrySection';
import ProductSection from '@/components/pages/main/ProductSection';
import UseCaseSection from '@/components/pages/main/UseCaseSection';
import CtaSection from '@/components/pages/main/CtaSection';

export default function Home() {
  return (
    <div className='flex flex-col gap-40'>
      <HeroSection/>
      <IndustrySection />
      <ProductSection />
      <UseCaseSection />
      <CtaSection />
    </div>
  )
}
