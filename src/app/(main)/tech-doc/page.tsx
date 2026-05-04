import { client } from '@/lib/sanity'

import { FEATURE_FLAGS } from '@/constants/config';
import { TECH_DOC_PAGE_QUERY, CONTACT_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import TechDocContainer from '@/components/pages/tech-doc/TechDocContainer'
import { TechDocPageDTO, ContactDTO } from '@/types/respDto'

export const metadata = {
  title: "기술 자료실",
  description: "제품 카탈로그, 기술 자료 등 지원에스로봇의 전문 자료를 제공합니다. 공장 자동화 및 물류 로봇 도입을 위한 상세 데이터를 확인하실 수 있습니다."
}

interface TechDocPageProps{
  searchParams: Promise<{productId?: string}>
}

export default async function page({searchParams}: TechDocPageProps) {
  const {productId} = await searchParams;
  
  const techDocs:TechDocPageDTO = await client.fetch(TECH_DOC_PAGE_QUERY);
  const contact: ContactDTO | null = !FEATURE_FLAGS.IS_INQUIRY_ENABLED 
    ? await client.fetch(CONTACT_QUERY) //캐시 무시
    : null;  

  const heroData = getHeroDataByPath('/tech-doc');
  return (
    <div>
        <HeroBanner heroData={heroData}/>
        <TechDocContainer techDocData={techDocs} selectedId={productId} contact={contact}/>
    </div>
  )
}
