// 랜딩페이지 ISR로 sEO
import { client } from '@/lib/sanity';

import { LANDING_PAGE_QUERY} from '@/lib/queries';
import HeroSection from '@/components/pages/main/HeroSection';
import LogoTicker from '@/components/elements/LogoTicker';
import IndustrySection from '@/components/pages/main/IndustrySection';
import ProductLineSection from '@/components/pages/main/ProductLineSection';
import UseCaseSection from '@/components/pages/main/UseCaseSection';
import CtaSection from '@/components/pages/main/CtaSection';
import { LandingPageDTO, IndustryListDTO, ProductLineListDTO, UseCasePageDTO, ClientsDTO } from '@/types/respDto';

export default async function Home() {
  const landing: LandingPageDTO = await client.fetch(LANDING_PAGE_QUERY);

  console.log(landing.useCases)

  return (
    <div className='flex flex-col'>
      <HeroSection/>
      {/* <LogoTicker clients={landing.clients}/> */}
      <IndustrySection industries={landing.industries}/>
      <ProductLineSection productLines={landing.productLines} />
      <UseCaseSection useCases={landing.useCases}/>
      <CtaSection />
    </div>
  )
}
