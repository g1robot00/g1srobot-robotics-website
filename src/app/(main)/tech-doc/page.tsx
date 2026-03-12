import { client } from '@/lib/sanity'

import { FEATURE_FLAGS } from '@/constants/config';
import { TECH_DOC_QUERY, CONTACT_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import TechDocContainer from '@/components/pages/tech-doc/TechDocContainer'
import { TechDocDTO, ContactDTO } from '@/types/respDto'

interface TechDocPageProps{
  searchParams: Promise<{productId?: string}>
}

export default async function page({searchParams}: TechDocPageProps) {
  const {productId} = await searchParams;
  
  const techDocs: TechDocDTO[] = await client.fetch(TECH_DOC_QUERY);
  const contact :ContactDTO | null = !FEATURE_FLAGS.IS_INQUIRY_ENABLED 
    ? await client.fetch(CONTACT_QUERY, {}, { next: { revalidate: 0 } }) //캐시 무시
    : null;  

  const heroData = getHeroDataByPath('/tech-doc');
  return (
    <div>
        <HeroBanner heroData={heroData}/>
        <TechDocContainer techDocs={techDocs} selectedId={productId} contact={contact}/>
    </div>
  )
}
