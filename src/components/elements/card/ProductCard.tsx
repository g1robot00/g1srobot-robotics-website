import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ProductItemDTO, ProductSpec } from '@/types/respDto'

interface ProductCardProps {
    product: ProductItemDTO 
}

export default function ProductCard({ product }: ProductCardProps) {
    const {label, href, specs, thumbnail} = product

    return (
        <Link href={href} key={label} className="group block">
            <div className='relative w-full h-82 rounded-xl overflow-hidden'>
                {thumbnail
                    ? <Image src={thumbnail} alt={label} fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 33vw" // 성능 최적화
                    />   
                    : <div className="w-full h-full bg-gray-200" />
                }

                {/* 호버 검정레이어 */}
                <div className={'absolute inset-0 px-10 bg-black/70 text-white' +
                                ' opacity-0 group-hover:opacity-100 transition-opacity duration-300' +
                                ' flex flex-col justify-center'}
                >
                    <div className='w-full'>
                        {/* <h4 className='flex justify-center text-lg font-bold'>제품사양</h4> */}
                        {specs?.map((spec, idx) => (
                                <div key={`${idx}_${spec.label}`} 
                                    className={`w-full py-4 ${idx !== 0 && 'border-t border-white/20'}` +
                                                ` flex items-center justify-between`}>
                                    <span>{spec.label}</span>
                                    <span className='text-lg font-semibold'>
                                        {spec.value}
                                        {spec.unit}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <h3 className='text-xl font-bold group-hover:text-main transition-colors'>{label}</h3>
            </div>
        </Link>
    )
}
