'use client'

import { useRef } from 'react'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { ProductDetailDTO, RobotDetailDTO } from '@/types/respDto'

interface ProductDetailContainerProps {
    product: RobotDetailDTO //ProductDetailDTO
}

export default function ProductDetailContainer({product}: ProductDetailContainerProps) {
    const inquiryRef = useRef<HTMLDivElement>(null);

    const scrollToInquiry = () => {
        inquiryRef.current?.scrollIntoView({behavior:'smooth', block:'start'})
    }

    return (
        <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20'>
            <div className='flex flex-col gap-24'>
                <ProductIntroSection product={product} onInquiryClick={scrollToInquiry}/>
                
                <ProductDescriptionSection />

                <div ref={inquiryRef}>
                    <ProductInquirySection productName={product.name}/>
                </div>
            </div>
        </div>
    )
}
