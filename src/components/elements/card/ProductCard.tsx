import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Badge from '@/components/ui/Badge'
import { ProductItemDTO, ProductSpec } from '@/types/respDto'

interface ProductCardProps {
    product: ProductItemDTO 
}

export default function ProductCard({ product }: ProductCardProps) {
    const {label, type, href, specs, thumbnail} = product
    const typeConfig = {
        system: {label: '시스템', color: 'bg-blue-500'},
        robot: {label: '로봇', color: 'bg-main'},
        component: {label: '부품', color: 'bg-gray-500'},
    }
    const currentType = typeConfig[type];

    const specToShow = specs?.slice(0,3);

    return (
        <Link href={href} key={label} className="group block flex flex-col gap-3">
            <div className='relative w-full aspect-square md:aspect-10/9  rounded-xl overflow-hidden'>
                {thumbnail
                    ? <Image src={thumbnail} alt={label} fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 33vw" // 성능 최적화
                    />   
                    : <div className="w-full h-full bg-gray-200" />
                }

                {/* 호버 검정레이어 */}
                <div className={'absolute inset-0 px-10 bg-black/80 text-white' +
                                ' opacity-0 group-hover:opacity-100 transition-opacity duration-300' +
                                ' flex flex-col justify-center'}
                >
                    <div className='w-full'>
                        {/* <h4 className='flex justify-center text-lg font-bold'>제품사양</h4> */}
                        {specToShow.map((spec, idx) => (
                                <div key={`${idx}_${spec.label}`} 
                                    className={`w-full py-4 ${idx !== 0 && 'border-t border-white/20'}` +
                                                ` flex items-center justify-between`}>
                                    <span>{spec.label}</span>
                                    <span className='text-base md:text-lg font-semibold'>
                                        {spec.value}
                                        {spec.unit}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-lg md:text-xl font-bold group-hover:text-main transition-colors'>
                    <Badge label={currentType.label} className={`${currentType.color} w-full h-full shadow-none mr-2`}/>
                    {label}
                </h3>
                <div className='flex flex-wrap'>
                    {specToShow.map((spec, idx) => (
                        <div className='text-gray-500 text-[10px] md:text-sm 
                                        before:mr-1 after:content-["/"] after:ml-1 last:after:content-none'
                        >
                            <span className='mr-1'>{spec.label}</span>
                            {spec.value}{spec.unit}
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}
