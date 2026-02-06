'use client'

import { useState, useRef } from "react";
import Image from "next/image"

import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, PlayCircle } from 'lucide-react'

interface ProductThumbnailsProps {
    allMedia: {type: string, url: string;}[]
    name: string
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductThumbnails({ allMedia, name, activeIndex, setActiveIndex }: ProductThumbnailsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    // 버튼클릭 시 스크롤 이동(데스트탑)
    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const {scrollLeft, clientWidth} = scrollRef.current;
            const scrollAmount = clientWidth * 0.6; // 한번에 약 80% 이동

            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className='w-full mt-5 md:mt-10 px-5 flex gap-2 md:gap-4 items-center justify-center '>
            <button onClick={() => handleScroll('left')}
                className={`hidden md:block p-3 hover:bg-gray-200 rounded-full text-gray-700 cursor-pointer transition-colors 
                            disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-transparent`}
            >
                <ChevronLeft />
            </button>
            <div ref={scrollRef} 
                className="flex gap-1 md:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
                style={{ maxWidth: 'min(100%, 600px)' }} // 썸네일 영역 최대 너비 제한
            >
                {allMedia.map((item, idx) =>  (
                        <button key={`${idx}_${item.url}`}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "relative flex-shrink-0 w-[clamp(60px,5vw,100px)] aspect-square snap-center overflow-hidden transition-all bg-white cursor-pointer",
                                activeIndex === idx ? "border-main shadow-md" : "opacity-60 hover:opacity-100"
                            )}
                        >
                            {item.type === 'image' 
                                ?<Image src={allMedia[idx].url} alt={`${name} thumb ${idx}`} fill className='object-cover' />
                                :<div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center gap-1">
                                    <PlayCircle className="text-white/80 group-hover:text-white transition-colors" size={32} />
                                    <span className="text-[9px] text-white/60 font-bold tracking-tighter">VIDEO</span>
                                </div>
                            }
                        </button>
                    )
                )}
            </div>
            <button onClick={() => handleScroll('right')}
                className={`hidden md:block p-3 hover:bg-gray-200 rounded-full text-gray-700 cursor-pointer transition-colors 
                            disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-transparent`}
            >
                <ChevronRight />
            </button>
        </div>
    )
}
