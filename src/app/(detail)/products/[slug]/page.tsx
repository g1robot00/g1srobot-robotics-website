import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"

import { UNIVERSAL_DETAIL_QUERY } from "@/lib/queries"
import ProductDetailContainer from "@/components/pages/products/detail/ProductDetailContainer"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function page({ params }: PageProps) {
    // url에서 slug 추출(params.slug)
    const { slug } = await params;

    const product = await client.fetch(UNIVERSAL_DETAIL_QUERY, { slug }); // (기존)제품


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
