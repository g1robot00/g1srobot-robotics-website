import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { ProductItemDTO, ProductSpec } from '@/types/respDto'

interface ProductCardProps {
    product: ProductItemDTO ,
    from?: 'industry' | 'productLine',
    id?: string,
}

export default function ProductCard({ product, from, id }: ProductCardProps) {
    const {label, type, href, specs, thumbnail} = product
    const typeConfig = {
        system: {label: '시스템', color: 'bg-blue-500/20 text-blue-500'},
        robot: {label: '로봇', color: 'bg-main/20 text-main'},
        component: {label: '부품', color: 'bg-gray-500/20 text-gray-500'},
    }
    const currentType = typeConfig[type];

    const specToShow = specs?.slice(0,3);

    return (
        <Link href={`${href}?from=${from}&id=${id}`} key={label} 
            className={cn('group block flex flex-col gap-4 p-2 md:p-3 transition-all duration-300 rounded-2xl', 'hover:bg-gray-100')}
        >
            <div className='relative w-full aspect-square md:aspect-[10/9]  rounded-xl overflow-hidden'>
                {thumbnail
                    ? <Image src={thumbnail} alt={label} fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 33vw" // 성능 최적화
                    />   
                    : <div className="w-full h-full bg-gray-200" />
                }

                {/* 호버 검정레이어 */}
                <div className={cn('absolute inset-0 px-10 bg-black/60  text-white',
                                'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                                'flex flex-col justify-center')}
                >
                    <div className='w-full'>
                        {/* <h4 className='flex justify-center text-lg font-bold'>제품사양</h4> */}
                        {specToShow.map((spec, idx) => (
                                <div key={`${idx}_${spec.label}`} 
                                    className={`w-full py-4 ${idx !== 0 && 'border-t border-white/20'}` +
                                                ` flex items-center justify-between`}>
                                    <span className=''>{spec.label}</span>
                                    <span className='text-base md:text-lg font-semibold'>
                                        {spec.value}/
                                        {spec.unit}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-y-1 md:flex-row '>
                    <Badge label={currentType.label} className={`${currentType.color} flex-shrink-0 w-fit h-fit shadow-none mr-2`}/>
                    {/* <span  className={`${currentType.color} font-bold text-xs flex-shrink-0 w-fit h-fit shadow-none mr-2`}>{currentType.label}</span> */}
                    <h3 className={cn('text-lg md:text-xl font-bold leading-snug group-hover:text-main transition-colors', 
                                    'line-clamp-2 break-keep min-h-[3rem] md:min-h-[3.5rem]')} //FIXME rem이 무슨단위
                    >
                        {label}
                    </h3>
                </div>
                {/* 모바일 스펙 요약 */}
                <div className='flex flex-col gap-y-2 md:gap-y-4 bg-gray-100 p-3 rounded-lg divide-y divide-gray-200 '>
                    {specToShow.map((spec, idx) => (
                        <div key={`${idx}_${spec.label}`} className='flex flex-col md:flex-row md:justify-between text-xs md:text-sm truncate'>
                            <span className='mr-1 text-gray-500'>{spec.label}</span>
                            <span className='font-bold text-gray-700'>{spec.value}{spec.unit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}
