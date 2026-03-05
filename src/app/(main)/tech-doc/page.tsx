import React from 'react'
import { client } from '@/lib/sanity'

import { TECH_DOC_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import TechDocContainer from '@/components/pages/tech-doc/TechDocContainer'
import { TechDocDTO } from '@/types/respDto'

interface TechDocPageProps{
  searchParams: Promise<{productId?: string}>
}

export default async function page({searchParams}: TechDocPageProps) {
  const {productId} = await searchParams;
  // const initialProductId = resolvedParams.product || null;
  
  const techDocs: TechDocDTO[] = await client.fetch(TECH_DOC_QUERY);  

  const heroData = getHeroDataByPath('/tech-doc');
  return (
    <div>
        <HeroBanner heroData={heroData}/>
        <TechDocContainer techDocs={techDocs} selectedId={productId}/>
    </div>
  )
}
