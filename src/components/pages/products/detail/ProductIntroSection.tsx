'use client'

import ProductIntroGallery from './ProductIntroGallery'
import ProductIntroInfo from './ProductIntroInfo'
import ProductIntroButton from './ProductIntroButton'
import { UniversalDetailDTO, DetailNavDTO } from '@/types/respDto'

interface ProductIntroSectionProps {
    product: UniversalDetailDTO
    onInquiryClick: () => void
    contextList: DetailNavDTO[]
    from?: 'industry' | 'productLine'
}

export default function ProductIntroSection({ product, onInquiryClick, contextList, from }: ProductIntroSectionProps) {
    return (
        <div className='grid gap-10 grid-cols-1 md:grid-cols-2 h-full' >
            {/* 미디어 영역 */}
            <div className='flex flex-col min-h-0'>
                <ProductIntroGallery imgUrls={product.images} videoUrls={product.videos} name={product.name}/>
            </div>
            
            {/* 제품 설명 */}
            <div className='flex flex-col gap-6 min-h-0 '>
                <ProductIntroInfo product={product} contextList={contextList} from={from}/>
                <ProductIntroButton onInquiryClick={onInquiryClick} productId={product.id} hasDocs={product.hasDocs}/>
            </div>
        </div>
    )
}
