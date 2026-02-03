'use client'

import { useRef } from 'react'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { ProductDetailDTO} from '@/types/respDto'


import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import ProductGallery from './ProductGallery'
import {  RobotDetailDTO } from '@/types/respDto'

interface ProductDetailContainerProps {
    product: RobotDetailDTO //ProductDetailDTO
}

export default function ProductDetailContainer({product}: ProductDetailContainerProps) {
    const { name, description, specs, images, video } = product
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className='mx-auto  px-5 md:px-10 lg:px-20 py-20'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
                <div className='md:col-span-2 flex flex-col justify-center items-center gap-6'>
                    <div className='relative w-full max-w-[900px] max-y-[900px] aspect-[4/3] bg-gray-200 overflow-hidden p-12'>
                        <Image src={images[activeIndex]} 
                                alt={`${name} main`}
                                fill
                                priority
                                className='object-contain'
                        />
                    </div>
                    <div className='flex gap-4 justify-center'>
                        {images.map((item, idx) => (
                            <button key={`${idx}_${item}`}
                                    onClick={()=>setActiveIndex(idx)}
                                    className={cn(
                                            "relative w-20 h-20  overflow-hidden border-2 transition-all bg-white cursor-pointer",
                                            activeIndex === idx ? "border-main shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                                            )}
                            >
                                <Image src={images[idx]} alt={`${name} thumb ${idx}`} fill/>
                            </button>
                        ))}

                    </div>
                </div>
                {/* 우측 패널 */}
                 {/* p-10 bg-white rounded-xl shadow-md */}
                <div className='md:col-span-1 flex flex-col gap-8 h-full'>
                    <div className='space-y-4'>
                        <span className='text-main font-bold tracking-widest uppercase text-sm'>Product Detail</span>
                        <h2 className='text-4xl font-extrabold text-gray-900 leading-tight'>{name}</h2>
                        <div className="h-1 w-12 bg-main" />
                    </div>

                    <p className='text-lg text-gray-600 leading-relaxed'>
                        {description}
                    </p>
                    <div className='w-full bg-gray-50 rounded-lg p-6 space-y-4 devide-y divide-gray-200'>
                        {specs.map((item, idx) => (
                            <div key={`${idx}_${item}`} 
                                className='w-full flex justify-between'
                            >
                                <span className='text-gray-500'>{item.label}</span>
                                <span className='text-lg font-semibold'>
                                    {item.value}
                                    {item.unit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        // <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20'>
        //     <div className='flex flex-col gap-24'>
        //         <ProductIntroSection product={product} onInquiryClick={scrollToInquiry}/>
                
        //         <ProductDescriptionSection />

        //         <div ref={inquiryRef}>
        //             <ProductInquirySection productName={product.name}/>
        //         </div>
        //     </div>
        // </div>
    )
}
