import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"

import { 
    UNIVERSAL_DETAIL_QUERY, 
    PRODUCT_LINE_NAV_QUERY, 
    INDUSTRY_NAV_QUERY 
} from "@/lib/queries"
import ProductDetailContainer from "@/components/pages/products/detail/ProductDetailContainer"
import { UniversalDetailDTO, DetailNavDTO } from "@/types/respDto"

interface PageProps {
    params:  Promise<{ slug: string }>
    searchParams: Promise<{ from?: string; id?: string }>
}

export default async function page({ params, searchParams }: PageProps) {
    // url에서 slug 추출(params.slug)
    const { slug } = await params;
    const {from, id} = await searchParams;

    const product: UniversalDetailDTO = await client.fetch(UNIVERSAL_DETAIL_QUERY, { slug }); // (기존)제품

    // 'from'에 맞는 형제 제품리스트 가져오기
    let contextList: DetailNavDTO[] = [];
    if(from === 'industry') {
        contextList = await client.fetch(INDUSTRY_NAV_QUERY);
    } else if (from === 'productLine') {
        contextList = await client.fetch(PRODUCT_LINE_NAV_QUERY);
    }

    // 데이터없으면 404페이지
    if (!product) {
        notFound();
    }

    return (
        <main>
            <ProductDetailContainer product={product} contextList={contextList} from={from}/>
        </main>
    )
}
