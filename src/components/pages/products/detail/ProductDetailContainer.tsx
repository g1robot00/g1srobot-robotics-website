'use client'

import { useRef } from 'react'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { UniversalDetailDTO, DetailNavDTO } from '@/types/respDto'

interface ProductDetailContainerProps {
    product: UniversalDetailDTO
    contextList: DetailNavDTO[]
    from?: 'industry' | 'productLine'
}

export default function ProductDetailContainer({ product, contextList, from }: ProductDetailContainerProps) {
    const inquiryRef = useRef<HTMLDivElement>(null);

    const scrollToInquiry = () => {
        inquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }


    return (
        <section className='mx-auto '>
            <div className='flex flex-col gap-20 md:gap-30 '>
                <div className='flex flex-col px-5 md:px-10 lg:px-30 py-20 md:pb-30 md:pt-40'
                >
                    <ProductIntroSection product={product} onInquiryClick={scrollToInquiry} contextList={contextList} from={from}/>
                </div>

                <div className='px-5 md:px-10 lg:px-30 '>
                    <ProductDescriptionSection product={product} from={from}/>
                </div>

                <div ref={inquiryRef} className='px-5 md:px-10 lg:px-30 bg-gray-200 py-20 md:pt-30 md:pb-40'>
                    <ProductInquirySection productName={product.name} />
                </div>
            </div>
        </section>
    )
}
