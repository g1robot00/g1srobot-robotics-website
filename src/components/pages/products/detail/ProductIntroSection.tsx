'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { cn } from '@/lib/utils'
import ProductGallery from './ProductGallery'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { UniversalDetailDTO, DetailNavDTO } from '@/types/respDto'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface ProductIntroSectionProps {
    product: UniversalDetailDTO
    onInquiryClick: () => void
    contextList: DetailNavDTO[]
    from?: 'industry' | 'productLine'
}

export default function ProductIntroSection({ product, onInquiryClick, contextList, from }: ProductIntroSectionProps) {
    const [openMenu, setOpenMenu] = useState(false);
    const [openInnerMenuId, setOpenInnerMenuId] = useState<string | null>(null);
    const mainSpecs = product.specs.slice(0, 3);
    const industryJoin = product.industries.map(i => i).join(' / ')
    const buttonStyle = 'flex-1 justify-start text-md h-15';
    console.log(product.productLine);


    // 외부클릭시 닫음
    // useEffect(() => {
    //     if (!openMenu) return;
    //     const closeMenu = () => setOpenMenu(false);
    //     window.addEventListener('click', closeMenu);
    //     return () => window.removeEventListener('click', closeMenu);
    // }, [openMenu]);

    return (
        <div className='grid gap-10 grid-cols-1 md:grid-cols-2 flex-1 h-full' >
            {/* 미디어 영역 */}
            <div className=' flex-1 flex flex-col h-full min-h-0'>
                <ProductGallery imgUrls={product.images} videoUrls={product.videos} name={product.name}/>
            </div>
            
            {/* 제품 설명 */}
            <div className='col-span-1 h-full flex flex-col gap-6 justify-between'>
                <div className='flex flex-col gap-5 md:gap-10 '>
                    <div className='pb-2 md:pb-5 border-b border-gray-200 flex flex-col gap-2 md:gap-3'>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-400 mb-2">
                            <span>{from === 'industry' ? '산업별 솔루션' : '제품 및 서비스'}</span>
                            <ChevronRight size={12} />
                            {/* 클릭하면 해당 카테고리의 다른 제품들을 보여주는 드롭다운 */}
                            <div className="relative">
                                <button onClick={() => setOpenMenu(prev => !prev)}
                                        className="flex items-center gap-1 text-main font-bold cursor-pointer"
                                >
                                    {from === 'industry' ? industryJoin : product.productLine} <ChevronDown size={14} />
                                </button>
                                
                                {/* 드롭다운 리스트 */}
                                {openMenu &&
                                    <ul className="absolute top-full z-50 left-0 overflow-y-scroll h-[100px] max-w-[300px] py-2 mt-2 bg-white shadow-xl border border-gray-100 rounded-lg ">
                                        {contextList.map(item => (
                                            <li key={item.id} className='block px-4 py-2'>
                                                <button onClick={() => setOpenInnerMenuId(prev => prev === item.id ? null : item.id)}
                                                        className='flex items-center text-black cursor-pointer'
                                                >
                                                    <p className='font-bold'>{item.name}</p>
                                                    <ChevronDown size={14} />
                                                </button>
                                                {openInnerMenuId === item.id && item.products.map(i => (
                                                    <Link 
                                                        href={`${i.href}?from=${from}&id=${i.id}`}
                                                        onClick={() => setOpenMenu(false)}
                                                        className={cn(
                                                            "block hover:bg-gray-50",
                                                            i.href === product.href ? "text-main" : "text-gray-600"
                                                        )}
                                                    >
                                                        {i.name}
                                                    </Link>
                                                    
                                                ))}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                        <h4 className='text-2xl md:text-4xl font-bold'>{product.name}</h4>
                    </div>
                    <div className='flex justify-between px-2'>
                        {mainSpecs.map(spec => (
                            <div key={spec.label} className='flex flex-col'>
                                <div className='text-lg md:text-2xl font-semibold'>
                                    <span>{spec.value}</span>
                                    <span>{spec.unit}</span>
                                </div>
                                <span className='text-sm text-gray-400'>{spec.label}</span>
                            </div>
                        ))}
                    </div>
                    <p className='flex-1 p-5 bg-gray-100 rounded-lg text-gray-800 whitespace-pre-wrap oveflow-y-scroll'>
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
