import { client } from '@/lib/sanity';

import { COMPANY_QUERY } from '@/lib/queries'
import { COMPANY_TABS } from '@/constants/company';
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import CompanyContainer from '@/components/pages/company/CompanyContainer'
import { CompanyDTO } from '@/types/respDto';


export const metadata = {
  title: "회사 소개",
  description: "지원에스로봇 G1sRobot은 특수목적 전용장비 제작 역량을 바탕으로 좁은 공간의 한계를 넘는 로봇을 개발합니다. 무인 자동화의 새로운 기준을 만드는 지원에스로봇의 비전을 소개합니다.",
};

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
