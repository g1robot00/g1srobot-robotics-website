import React from 'react'
import { client } from '@/lib/sanity';

import { COMPANY_QUERY } from '@/lib/queries'
import HeroBanner from '@/components/shared/hero/HeroBanner'
import SubCategoryTab from '@/components/shared/hero/SubCategoryTab'
import CompanyContainer from '@/components/pages/company/CompanyContainer'
import { CompanyDTO } from '@/types/respDto';


export default async function page() {
  const company: CompanyDTO = await client.fetch(COMPANY_QUERY) ;
  console.log('연혁 데이터 : ', company);
  
  const tabList = [
    // {label: 'About', id: }
  ]

  return (
    <div >
        <HeroBanner />
        <CompanyContainer company={company}/>
    </div>
  )
}
