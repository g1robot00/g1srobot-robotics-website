'use client'

import { useRef } from 'react'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { ProductDetailDTO} from '@/types/respDto'


import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import ProductThumbnails from './ProductThumbnails'
import Button from '@/components/ui/Button'
import InquiryForm from '@/components/elements/contact/InquiryForm'
import {  RobotDetailDTO } from '@/types/respDto'

interface ProductDetailContainerProps {
    product: RobotDetailDTO //ProductDetailDTO
}

export default function ProductDetailContainer({product}: ProductDetailContainerProps) {
    const { name, description, specs, images, videos, productLine } = product
    const [activeIndex, setActiveIndex] = useState(0);

    const inquiryRef = useRef<HTMLDivElement>(null);

    const scrollToInquiry = () => {
        inquiryRef.current?.scrollIntoView({behavior:'smooth', block:'start'})
    }

    const allMedia: {type: string, url: string}[] = [
        ...(images?.map(url => ({type: 'image', url})) ?? []),
        ...(videos?.map(url => ({type: 'video', url})) ?? []),
    ]

    const buttonStyle = 'flex-1 justify-start text-sm md:text-base h-15';


    return (
        <section className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20 md:py-30'>
            <div className='flex flex-col gap-10 md:gap-30'>
                <div className='flex flex-col'
                >
                    <ProductIntroSection product={product} onInquiryClick={scrollToInquiry}/>
                </div>

                    <ProductDescriptionSection product={product}/>

                <div ref={inquiryRef}>
                    <ProductInquirySection productName={product.name}/>
                </div>
            </div>
        </section>
    )
}
