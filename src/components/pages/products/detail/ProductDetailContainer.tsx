'use client'

import { useRef } from 'react'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { UniversalDetailDTO } from '@/types/respDto'

interface ProductDetailContainerProps {
    product: UniversalDetailDTO
}

export default function ProductDetailContainer({ product }: ProductDetailContainerProps) {
    const inquiryRef = useRef<HTMLDivElement>(null);

    const scrollToInquiry = () => {
        inquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }


    return (
        <section className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20 md:py-30'>
            <div className='flex flex-col gap-30'>
                <div className='flex flex-col'
                >
                    <ProductIntroSection product={product} onInquiryClick={scrollToInquiry} />
                </div>

                <ProductDescriptionSection product={product} />

                <div ref={inquiryRef}>
                    <ProductInquirySection productName={product.name} />
                </div>
            </div>
        </section>
    )
}
