import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { ProductLineListDTO } from '@/types/respDto';
import { ChevronRight, CircleAlert  } from 'lucide-react';

interface ProductLineCategoryProps {
    productLines: ProductLineListDTO[];
    activeId: number;
    onItemClick: (index: number) => void ;
    itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export default function ProductLineCategory({productLines, activeId, onItemClick, itemRefs}: ProductLineCategoryProps) {
    return (
        <>
            {productLines.map((item, index) => {
                const isActive = activeId === index;
                return (
                    <div key={item.id}
                        data-index={index}
                        ref={(el) => { itemRefs.current[index] = el; }} //ref 저장
                        className={cn('border-b border-gray-800 transition-opacity duration-500',
                            isActive ? 'border-main opacity-100' : 'opacity-30 hover:opacity-100')}
                    >
                        <Link href={item.hasProducts ? `${item.href}#${item.id}` : '/support'}
                            onClick={(e) => {
                                if (!isActive) {
                                    e.preventDefault();
                                    onItemClick(index);
                                }
                            }}
                            className='block group p-3  py-7 md:py-12'
                        >
                            <div className={cn('flex flex-col gap-2 md:flex-row md:items-center md:justify-between transition-all duration-500',
                                isActive ? 'mb-10' : 'text-gray-600 hover:text-gray-400')}
                            >
                                <div className='flex flex-col gap-2'>
                                    <p className={`text-sm md:text-base font-bold ${isActive && 'text-main'}`}>{item.nameEn}</p>
                                    <h3 className={cn('text-2xl md:text-4xl  font-bold tracking-tight',
                                        isActive && 'text-white')}
                                    >
                                        {item.label}
                                    </h3>
                                </div>

                            </div>
                            {/* 상세내용 및 모바일 전용 이미지 */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'circOut' }}
                                        className='flex flex-col gap-6 '
                                    >
                                        <p className='text-gray-300 text-base tracking-wide leading-relaxed whitespace-pre-wrap'>
                                            {item.content}
                                        </p>

                                        <div className='relative flex flex-col w-fit'>
                                            <div
                                                className={cn(
                                                    'flex items-center gap-2 transition-all duration-300',
                                                    item.hasProducts ? 'text-white group-hover:text-main' : 'text-white group-hover:text-amber-400',
                                                )}
                                            >
                                                <span className='text-sm md:text-sm font-bold whitespace-nowrap'>
                                                    {item.hasProducts ? 'View more' : 'Go to Inquiry'}
                                                </span>

                                                <ChevronRight className='w-4 h-4 md:w-5 md:h-5 stroke-[2px]' />
                                            </div>
                                            {!item.hasProducts &&
                                                <span className='md:hidden flex gap-1 text-[10px] text-gray-500'>
                                                    <CircleAlert size={12} />
                                                    제품 준비 중입니다. 문의주시면 상세히 안내해 드리겠습니다.
                                                </span>
                                            }
                                            {!item.hasProducts && (
                                                <div className={cn("absolute top-full mt-1.5 z-10",
                                                    "opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0 transition-all duration-300",
                                                    "pointer-events-none whitespace-nowrap")}
                                                >
                                                    <div className={cn("relative bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md shadow-xl",
                                                        'flex items-center gap-1'
                                                    )}>
                                                        <CircleAlert size={14} />
                                                        제품 준비 중입니다. 문의주시면 상세히 안내해 드리겠습니다.
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* 모바일 전용 이미지박스 */}
                                        <div className='block lg:hidden relative w-full aspect-video bg-black rounded-lg overflow-hidden'>
                                            {item.thumbnail
                                                ? <Image 
                                                    src={item.thumbnail} 
                                                    alt={item.label} 
                                                    fill 
                                                    className='object-cover' 
                                                    sizes="(max-width: 1024px) 100vw, 1px" 
                                                    quality={85}
                                                />
                                                : <ImagePlaceholder />
                                            }
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}
