import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"

import { PRODUCT_DETAIL_QUERY } from "@/lib/queries"
import ProductDetailContainer from "@/components/pages/products/detail/ProductDetailContainer"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function page({ params }: PageProps) {
    // url에서 slug 추출(params.slug)
    const { slug } = await params;

    // cms에 해당 slug를 가진 제품 데이터 요청
    //$slug 자리에 현재 주소의 slug 값을 넣어줌
    const product = await client.fetch(PRODUCT_DETAIL_QUERY, { slug });

    // 데이터없으면 404페이지
    if (!product) {
        notFound();
    }

    return (
        <main>
            <ProductDetailContainer product={product}/>
        </main>
    )
}
