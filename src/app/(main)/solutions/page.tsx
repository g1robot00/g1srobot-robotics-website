import { client } from "@/lib/sanity"

import { INDUSTRY_WITH_PRODUCTS_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import ProductContainer from "@/components/pages/products/ProductContainer"
import { IndustryProductsDTO } from "@/types/respDto"

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
