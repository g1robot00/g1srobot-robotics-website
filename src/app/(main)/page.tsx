// 랜딩페이지 ISR로 sEO
import { client } from '@/lib/sanity';

import { LANDING_PAGE_QUERY} from '@/lib/queries';
import HeroSection from '@/components/pages/main/HeroSection';
import LogoTicker from '@/components/elements/LogoTicker';
import IndustrySection from '@/components/pages/main/IndustrySection';
import ProductLineSection from '@/components/pages/main/ProductLineSection';
import UseCaseSection from '@/components/pages/main/UseCaseSection';
import CtaSection from '@/components/pages/main/CtaSection';
import { LandingPageDTO } from '@/types/respDto';

export const metadata = {
  title: {absolute: "지원에스로봇 G1sRobot | 스마트 공장 자동화 및 협소 공간 맞춤형 로봇 솔루션"},
  description: "협소 공간 맞춤형 로봇 및 스마트 공장 자동화 시스템 전문 지원에스로봇 G1sRobot 입니다. 자동창고 최적화 물류 로봇과 특수목적 전용장비 개발로 제조 현장의 생산성을 극대화합니다."
}

export default async function Home() {
  const landing: LandingPageDTO = await client.fetch(LANDING_PAGE_QUERY);

  return (
    <div className='flex flex-col'>
      <HeroSection/>
      <LogoTicker clients={landing.clients}/>
      <IndustrySection industries={landing.industries}/>
      <ProductLineSection productLines={landing.productLines} />
      <UseCaseSection useCases={landing.useCases}/>
      <CtaSection />
    </div>
  )
}
