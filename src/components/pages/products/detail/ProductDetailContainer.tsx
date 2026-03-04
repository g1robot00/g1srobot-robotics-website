'use client'

import { useRef } from 'react'

import { cn } from '@/lib/utils'
import { NAV_LAYOUT } from '@/constants/styles'
import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import Container from '@/components/shared/Container'
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
        <section className='mx-auto'>
            <div className='flex flex-col gap-20 md:gap-30'>
                <Container className={ `${NAV_LAYOUT.pt}`}
                >
                    <div className={`flex flex-col ${NAV_LAYOUT.screenH} pt-5 md:py-15`}>
                        <ProductIntroSection product={product} onInquiryClick={scrollToInquiry} contextList={contextList} from={from}/>
                    </div>
                </Container>

                <Container>
                    <ProductDescriptionSection product={product} from={from}/>
                </Container>

                <div ref={inquiryRef} className='bg-gray-200 py-20 md:pt-30 md:pb-40'>
                    <Container>
                        <ProductInquirySection productName={`${product.name} _ ${product.nameEn}`} />
                    </Container>
                </div>
            </div>
        </section>
    )
}
