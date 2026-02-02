import Image from 'next/image'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { ProductDetailDTO } from '@/types/respDto'

interface ProductDetailContainerProps {
    product: ProductDetailDTO
}

export default function ProductDetailContainer({product}: ProductDetailContainerProps) {
    return (
        <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20'>
            <div className='flex flex-col gap-24'>
                <ProductIntroSection product={product}/>
                
                <ProductDescriptionSection />

                <ProductInquirySection productName={product.name}/>
            </div>
        </div>
    )
}
