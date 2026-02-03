'use client'

import { useState } from 'react'
import Image from 'next/image'

import NavDropbar from '@/components/elements/hero/NavDropbar'
import ProductGallery from './ProductGallery'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { ProductDetailDTO, RobotDetailDTO } from '@/types/respDto'

interface ProductIntroSectionProps {
    product: RobotDetailDTO
    onInquiryClick: () => void
}

export default function ProductIntroSection({ product, onInquiryClick }: ProductIntroSectionProps) {


    const buttonStyle = 'flex-1 justify-start text-md h-15'

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
            <ProductGallery imgUrls={product.images} videoUrls={product.video}/>
            
            <div className='flex flex-col gap-10 '>
                <div className='pb-5 border-b border-gray-200 flex flex-col gap-5'>
                    <Badge label={product.productLine}
                            variant='outline'
                            className='text-gray-500 border-gray-200 w-fit' 
                    />
                    <h4 className='text-4xl font-bold '>{product.name}</h4>
                </div>
                <div className='flex justify-between'>
                    {product.specs.map(spec => (
                        <div key={spec.label} className='flex flex-col'>
                            <div className='text-2xl font-semibold'>
                                <span>{spec.value}</span>
                                <span>{spec.unit}</span>
                            </div>
                            <span className='text-sm text-gray-400'>{spec.label}</span>
                        </div>
                    ))}
                </div>
                <p className='h-35'>
                    {product.description}
                </p>
                <div className='flex gap-5'>
                    <Button label='제품 문의하기' onClick={onInquiryClick} className={buttonStyle} showArrow />
                    <Button href='/tech-doc' label='카탈로그 다운로드' className={buttonStyle} showArrow/>
                </div>
            </div>
        </div>
    )
}
