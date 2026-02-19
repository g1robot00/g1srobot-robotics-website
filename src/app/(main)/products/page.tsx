import { client } from "@/lib/sanity";

import { PRODUCT_LINE_WITH_PRODUCTS_QUERY } from "@/lib/queries";
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from "@/components/shared/hero/HeroBanner";
import SubCategoryTab from "@/components/shared/hero/SubCategoryTab";
import ProductContainer from "@/components/pages/products/ProductContainer";
import { ProductLineProductsDTO } from "@/types/respDto";

export default async function ProductsPage() {
    const productLines: ProductLineProductsDTO[] = await client.fetch(PRODUCT_LINE_WITH_PRODUCTS_QUERY);

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