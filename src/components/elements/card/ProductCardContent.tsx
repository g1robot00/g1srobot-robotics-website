import Image from 'next/image';

import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { ProductItemDTO } from '@/types/respDto'
import { ArrowUpRight, MessageCircle, Lock } from 'lucide-react'

interface ProductCardContentProps {
    product: ProductItemDTO;
    isLinkable: boolean;
}

export default function ProductCardContent({ product, isLinkable }: ProductCardContentProps) {
    const { label, type, specs, thumbnail } = product;

    const typeConfig = {
        system: { label: '시스템', color: 'bg-blue-500/20 text-blue-500' },
        robot: { label: '로봇', color: 'bg-main/20 text-main' },
    }
    const currentType = typeConfig[type];

    const displaySpecs = [...(specs || [])].slice(0, 3);
    while (displaySpecs.length < 3) {
        displaySpecs.push({ _key: `empty-slot-${displaySpecs.length}`, label: '', value: '', unit: '' }); //빈객체 추가
    }

    return (
        <>
            <div className='relative w-full aspect-square   rounded-xl overflow-hidden bg-gray-100'>
                {thumbnail
                    ? <Image src={thumbnail} alt={label} fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    : <ImagePlaceholder size='md' text={!isLinkable ? 'Coming Soon' : undefined} />
                }

                {/* 호버 검정레이어 */}
                <div className={cn('absolute inset-0 z-5 px-10 bg-black/60 backdrop-blur-[2px] text-white',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    'flex flex-col justify-center items-center gap-3')}
                >
                    <div className={cn(
                        "p-3 rounded-full transition-transform duration-500 scale-90 group-hover:scale-100",
                        isLinkable ? "bg-main/20 text-main" : "bg-white/10 text-gray-400"
                    )}>
                        {isLinkable ? <ArrowUpRight size={20} /> : <Lock size={20} />}
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                        <span className={cn(
                            "text-[8px] font-black uppercase tracking-[0.2em]",
                            isLinkable ? "text-main" : "text-gray-400"
                        )}>
                            {isLinkable ? "Explore" : "Closed"}
                        </span>
                        <span className="text-sm font-bold">
                            {isLinkable ? "상세정보 보기" : "정보 준비 중"}
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-y-1 md:flex-row '>
                    <Badge label={currentType.label} className={`${currentType.color} flex-shrink-0 w-fit h-fit shadow-none mr-2`} />
                    <h3 className={cn('text-lg md:text-xl font-bold leading-snug group-hover:text-main transition-colors',
                        'line-clamp-2 break-keep min-h-[3rem] md:min-h-[3.5rem]')}
                    >
                        {label}
                    </h3>
                </div>
                {/* 스펙 요약 */}
                <div className='relative p-4 bg-gray-100 rounded-lg'>
                    <div className={cn('flex flex-col gap-y-2 md:gap-y-4 divide-y divide-gray-200', !isLinkable && 'invisible')}>
                        {displaySpecs.map((spec) => (
                            <div key={spec._key} className='flex flex-col gap-1 md:flex-row md:justify-between text-xs md:text-sm'>
                                <span className='flex-shrink-0 mr-1 text-gray-500 font-medium'>{spec.label}</span>
                                {spec.value
                                    ? <span className='font-bold text-gray-700 truncate'>{spec.value}{spec.unit}</span>
                                    : <span className={`font-bold text-gray-700 ${!spec.label && 'invisible'}`}>-</span>
                                }
                            </div>
                        ))}
                    </div>
                    {!isLinkable &&
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1 py-2">
                            <span className="text-[10px] md:text-xs text-gray-400 font-medium ">
                                본 제품은 현재 최신 사양을<br />준비 중인 모델입니다.
                            </span>
                            <div className="text-[10px] text-main font-bold border-b border-main/30 px-2 py-0.5 rounded">
                                Inquiry Only
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
