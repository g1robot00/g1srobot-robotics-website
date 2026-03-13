import { client } from '@/lib/sanity';

import { COMPANY_QUERY } from '@/lib/queries'
import { COMPANY_TABS } from '@/constants/company';
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import CompanyContainer from '@/components/pages/company/CompanyContainer'
import { CompanyDTO } from '@/types/respDto';


export default async function page() {
  const company: CompanyDTO = await client.fetch(COMPANY_QUERY);
  
  const heroData = getHeroDataByPath('/company');

  return (
    <div >
        <HeroBanner heroData={heroData} subTabs={COMPANY_TABS}/>
        <CompanyContainer company={company}/>
    </div>
  )
}
