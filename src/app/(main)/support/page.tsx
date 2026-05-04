import { client } from '@/lib/sanity'

import { CONTACT_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import ContactContainer from '@/components/pages/contact/ContactContainer'
import { ContactDTO } from '@/types/respDto'

export const metadata = {
  title: "견적 및 도입 문의",
  description: "협소 공간 물류 로봇 및 전용 장비 도입에 대해 문의하세요. 지원에스로봇의 전문가들이 귀사 공정 특성에 최적화된 무인 자동화 시스템 설계를 제안해 드립니다."
}

export default async function page() {
  const contact: ContactDTO = await client.fetch(CONTACT_QUERY);
  const heroData = getHeroDataByPath('/support');
  
  return (
    <div>
        <HeroBanner heroData={heroData} />
        <ContactContainer contact={contact}/>
    </div>
  )
}
