import { client } from "@/lib/sanity";

import { PRODUCT_LINE_WITH_PRODUCTS_QUERY } from "@/lib/queries";
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from "@/components/shared/hero/HeroBanner";
import ProductContainer from "@/components/pages/products/ProductContainer";
import { ProductLineProductsDTO } from "@/types/respDto";

export const metadata = {
    title: "제품 및 서비스",
    description: "지원에스로봇 G1sRobot의 고효율 물류 로봇과 무인화 시스템 제품군을 확인하세요. 협소한 자동창고 환경에 최적화된 로봇 솔루션과 다양한 특수목적 전용장비 라인업을 제공합니다."
}

export default async function ProductsPage() {
    let productLines: ProductLineProductsDTO[] = await client.fetch(PRODUCT_LINE_WITH_PRODUCTS_QUERY);

    const heroData = getHeroDataByPath('/products');
    const tabList = productLines.map(pl => ({
        label: pl.label,
        id: pl.id,
    }));

    return(
        <div>
            <HeroBanner heroData={heroData} subTabs={tabList}/>
            <ProductContainer from='productLine' list={productLines} type="filter"/>
        </div>
    )
}