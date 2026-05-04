import { client } from "@/lib/sanity"

import { INDUSTRY_WITH_PRODUCTS_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import ProductContainer from "@/components/pages/products/ProductContainer"
import { IndustryProductsDTO } from "@/types/respDto"

export const metadata = {
  title: "산업별 솔루션",
  description: "다양한 제조 환경에 맞춘 최적의 로봇 자동화 솔루션을 제안합니다. 협소 공간 물류부터 특수 공정 무인화까지, 지원에스로봇만의 기술력으로 완벽한 스마트 팩토리를 실현하세요."
}

export default async function page() {
  const industries: IndustryProductsDTO[] = await client.fetch(INDUSTRY_WITH_PRODUCTS_QUERY);

  const heroData = getHeroDataByPath('/solutions');
  const tabList = industries.map(ind => ({
    label: ind.label,
    id: ind.id,
  }))

  return (
    <div>
        <HeroBanner heroData={heroData} subTabs={tabList}/>
        <ProductContainer from='industry' list={industries} />
    </div>
  )
}
