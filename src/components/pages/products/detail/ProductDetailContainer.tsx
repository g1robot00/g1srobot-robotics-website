'use client'

import { useRef } from 'react'

import ProductIntroSection from './ProductIntroSection'
import ProductDescriptionSection from './ProductDescriptionSection'
import ProductInquirySection from './ProductInquirySection'
import { ProductDetailDTO} from '@/types/respDto'


import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import ProductDetailNav from '@/components/shared/nav/ProductDetailNav'
import ProductThumbnails from './ProductThumbnails'
import Button from '@/components/ui/Button'
import InquiryForm from '@/components/elements/contact/InquiryForm'
import { RobotDetailDTO } from '@/types/respDto'
import { MoveLeft } from 'lucide-react';

import Nav from '@/components/shared/nav/Nav'
import { Menu, X } from 'lucide-react';

interface ProductDetailContainerProps {
    product: RobotDetailDTO //ProductDetailDTO
}

export default function ProductDetailContainer({product}: ProductDetailContainerProps) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    console.log('Nav오픈: ',isNavOpen)
    
    const { name, description, specs, images, videos, productLine } = product
    const [activeIndex, setActiveIndex] = useState(0);

    const allMedia: {type: string, url: string}[] = [
        ...(images?.map(url => ({type: 'image', url})) ?? []),
        ...(videos?.map(url => ({type: 'video', url})) ?? []),
    ]

    const buttonStyle = 'flex-1 justify-start text-sm md:text-base h-15';

    if(allMedia.length === 0) {
        return ( 
        <div className="w-full h-full aspect-[4/3] bg-gray-100 rounded-xl flex justify-center items-center text-gray-400">
            이미지 준비중
        </div>
    )}

    return (
        <>  
            <button onClick={() => setIsNavOpen(!isNavOpen)}
                    className='fixed top-6 right-10 z-[115] cursor-pointer'
            >
                {isNavOpen ? <X /> : <Menu />}
            </button>
            <Nav forceOpen={isNavOpen} />
            <section className='w-full h-screen'>
                <div className='w-full h-full grid grid-cols-1 md:grid-cols-3'>
                    {/* 미디어 영역 */}
                    <div className='md:col-span-2 flex flex-col justify-center items-center
                                    h-full bg-gray-100 md:px-10 lg:px-20 pb-5 md:py-10 '
                    >
                        <div className='flex items-start gap-5 items-center'>
                            <MoveLeft />
                            <Image className="dark:invert "
                                    src="/next.svg"
                                    alt="Next.js logo"
                                    width={100}
                                    height={20}
                                    priority
                            />
                        </div>
                        <div className='relative aspect-[4/3] w-full md:max-w-[85%] bg-gray-200 overflow-hidden'>
                            {allMedia[activeIndex].type === 'image'
                                ?<Image src={allMedia[activeIndex].url}
                                    alt={`${name} main`}
                                    fill
                                    priority
                                    className='object-contain'
                                />
                                : <video key={allMedia[activeIndex].url}
                                        src={allMedia[activeIndex].url}
                                        controls
                                        className='w-full h-full'
                                />
                            }
                        </div>
                        <ProductThumbnails allMedia={allMedia} name={name} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    </div>
                    {/* 우측 패널 */}
                    <aside className='w-full h-full bg-white px-5 md:px-10 lg:px-15 border-l border-gray-200 md:overflow-y-auto scrollbar-hide
                                    md:col-span-1 flex flex-col'
                    >
                        <div className='flex-1 flex flex-col gap-16 py-10 md:py-20'>
                            <div className='space-y-4'>
                                <span className='text-main font-bold tracking-widest uppercase text-xs md:text-sm'>{productLine}</span>
                                <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight'>{name}</h2>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <h3 className='font-bold text-base md:text-lg text-gray-700 '>제품 설명</h3>
                                <p className='text-base md:text-lg text-gray-600 leading-relaxed'>
                                    {description}
            
                                </p>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 사양</h3>
                                <div className='divide-y divide-gray-200 space-y-6'>
                                    {specs.map((item, idx) => (
                                        <div key={`${idx}_${item}`}
                                            className='flex justify-between'
                                        >
                                            <span className='text-sm md:text-base text-gray-500'>{item.label}</span>
                                            <span className='text-base md:text-lg font-semibold'>
                                                {item.value}
                                                {item.unit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 문의</h3>
                                <InquiryForm />
                            </div>
                        </div>
                        <div className='sticky bottom-0 z-2 py-5 bg-white border-t border-gray-200 flex gap-3'>
                            <Button label='제품 문의하기' className={buttonStyle} showArrow />
                            <Button href='/tech-doc' label='기술자료 다운로드' className={buttonStyle} showArrow/>
                        </div>
                    </aside>
                </div>
            </section>
        </>
    )
}
