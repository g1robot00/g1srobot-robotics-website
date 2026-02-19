import React from 'react'
import { client } from '@/lib/sanity'

import { TECH_DOC_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import TechDocContainer from '@/components/pages/tech-doc/TechDocContainer'
import { techDocDTO } from '@/types/respDto'

export default async function page() {
  const techDocs: techDocDTO[] = await client.fetch(TECH_DOC_QUERY);  

  const heroData = getHeroDataByPath('/tech-doc');
  return (
    <div>
        <HeroBanner heroData={heroData}/>
        <TechDocContainer techDocs={techDocs}/>
    </div>
  )
}
