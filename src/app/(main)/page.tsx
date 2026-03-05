// 랜딩페이지 ISR로 sEO
import { client } from '@/lib/sanity';

import { INDUSTRY_LIST_QUERY, PRODUCT_LINE_LIST_QUERY, USE_CASES_QUERY, CLIENTS_QUERY} from '@/lib/queries';
import HeroSection from '@/components/pages/main/HeroSection';
import LogoTicker from '@/components/elements/LogoTicker';
import IndustrySection from '@/components/pages/main/IndustrySection';
import ProductLineSection from '@/components/pages/main/ProductLineSection';
import UseCaseSection from '@/components/pages/main/UseCaseSection';
import CtaSection from '@/components/pages/main/CtaSection';
import { IndustryListDTO, ProductLineListDTO, UseCaseDTO, ClientsDTO } from '@/types/respDto';

export default async function Home() {
  const industries: IndustryListDTO[] = await client.fetch(INDUSTRY_LIST_QUERY) || [];
  const productLines: ProductLineListDTO[] = await client.fetch(PRODUCT_LINE_LIST_QUERY) || [];
  const useCases: UseCaseDTO[] = await client.fetch(USE_CASES_QUERY) || [];
  const clients: ClientsDTO[] = await client.fetch(CLIENTS_QUERY);

  return (
    <div className='flex flex-col'>
      <HeroSection/>
      {/* <LogoTicker clients={clients}/> */}
      <IndustrySection industries={industries}/>
      <ProductLineSection productLines={productLines} />
      <UseCaseSection useCases={useCases}/>
      <CtaSection />
    </div>
  )
}
