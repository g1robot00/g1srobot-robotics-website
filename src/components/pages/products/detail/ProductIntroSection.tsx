'use client'

import { useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import NavDropbar from '@/components/shared/hero/NavDropbar'
import ProductGallery from './ProductGallery'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { UniversalDetailDTO } from '@/types/respDto'

interface ProductIntroSectionProps {
    product: UniversalDetailDTO
    onInquiryClick: () => void
}

export default function ProductIntroSection({ product, onInquiryClick }: ProductIntroSectionProps) {

    const mainSpecs = product.specs.slice(0, 3);
    const buttonStyle = 'flex-1 justify-start text-md h-15'

    return (
        <div className='grid gap-10 grid-cols-1 md:grid-cols-2 flex-1 h-full overflow-hidden' >
            {/* 미디어 영역 */}
            <div className=' flex-1 flex flex-col h-full min-h-0'>
                <ProductGallery imgUrls={product.images} videoUrls={product.videos} name={product.name}/>
            </div>
            
            {/* 제품 설명 */}
            <div className='col-span-1 flex flex-col gap-6 justify-between'>
                <div className='flex flex-col gap-5 md:gap-10 '>
                    <div className='pb-2 md:pb-5 border-b border-gray-200 flex flex-col gap-2 md:gap-5'>
                        <span className='text-main font-bold tracking-widest uppercase text-xs md:text-sm'>{product.productLine}</span>
                        <h4 className='text-2xl md:text-4xl font-bold text-white'>{product.name}</h4>
                    </div>
                    <div className='flex justify-between'>
                        {mainSpecs.map(spec => (
                            <div key={spec.label} className='flex flex-col'>
                                <div className='text-lg md:text-2xl font-semibold text-white'>
                                    <span>{spec.value}</span>
                                    <span>{spec.unit}</span>
                                </div>
                                <span className='text-sm text-gray-400'>{spec.label}</span>
                            </div>
                        ))}
                    </div>
                    <p className='md:h-35 text-white'>
                        {product.description}
                    </p>
                </div>
                <div className={cn(
                            'w-full fixed bottom-0 left-0 z-50  flex gap-3  px-5 py-2 bg-white border-t border-gray-100',
                            'md:relative md:bottom-auto md:left-auto md:z-0   md:p-0 md:bg-transparent md:border-none '
                            )}>
                    <Button label='제품 문의하기' onClick={onInquiryClick} className={buttonStyle} showArrow />
                    <Button href='/tech-doc' label='다운로드' className={buttonStyle} showArrow/>
                </div>
            </div>
        </div>
    )
}
