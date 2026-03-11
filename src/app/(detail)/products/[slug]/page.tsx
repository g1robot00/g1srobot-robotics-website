import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"

import { 
    UNIVERSAL_DETAIL_QUERY, 
    PRODUCT_LINE_NAV_QUERY, 
    INDUSTRY_NAV_QUERY,
    CONTACT_QUERY
} from "@/lib/queries"
import { FEATURE_FLAGS } from "@/constants/config"
import ProductDetailContainer from "@/components/pages/products/detail/ProductDetailContainer"
import { UniversalDetailDTO, DetailNavDTO, ContactDTO } from "@/types/respDto"

interface PageProps {
    params:  Promise<{ slug: string }>
    searchParams: Promise<{ from?: 'industry' | 'productLine'; }>
}

export default async function page({ params, searchParams }: PageProps) {
    // url에서 slug 추출(params.slug)
    const { slug } = await params;
    const {from} = await searchParams;

    const product: UniversalDetailDTO = await client.fetch(UNIVERSAL_DETAIL_QUERY, { slug });
    
    let contextList: DetailNavDTO[] = [];
    if(from === 'industry') {
        contextList = await client.fetch(INDUSTRY_NAV_QUERY);
    } else if (from === 'productLine') {
        contextList = await client.fetch(PRODUCT_LINE_NAV_QUERY);
    }

    const contact :ContactDTO | null = 
        !FEATURE_FLAGS.IS_INQUIRY_ENABLED 
            ? await client.fetch(CONTACT_QUERY) 
            : null;

    if (!product) {
        notFound();
    }

    return (
        <main>
            <ProductDetailContainer product={product} contextList={contextList} from={from} contact={contact}/>
        </main>
    )
}
