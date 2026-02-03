'use client'

import { useState } from "react"
import Image from "next/image"

import { PlayCircle } from "lucide-react"

interface ProductGalleryProps {
    imgUrls: string[],
    videoUrls: string[]
}

export default function ProductGallery({ imgUrls, videoUrls }: ProductGalleryProps) {
    const allMedia = [
        ...(imgUrls?.map(url => ({ type: 'image', url })) ?? []),
        ...(videoUrls?.map(url => ({ type: 'video', url })) ?? [])
    ]
    const [activeIndex, setActiveIndex] = useState(0);
    const currentMedia = allMedia[activeIndex];

    if(allMedia.length === 0) {
        return ( 
        <div className="w-full h-full aspect-[4/3] bg-gray-100 rounded-xl flex justify-center items-center text-gray-400">
            이미지 준비중
        </div>
    )}

    return (
        <div className="flex flex-col gap-4">
            <div className='relative w-full h-full bg-gray-100 overflow-hidden '>
                {currentMedia?.type === 'image'
                    ? (<Image src={currentMedia.url} alt={currentMedia.url} fill className="object-contain w-full h-full"  sizes="(max-width: 768px) 100vw, 33vw"/>)
                    : (<video src={currentMedia.url} controls className="w-full h-full" />)
                }
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
                {allMedia.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 
                                ${activeIndex === idx ? 'border-main' : 'border-transparent'}`}
                    >
                        {item.type === 'image' ? (
                            <img src={item.url} className="object-cover w-full h-full opacity-60 hover:opacity-100" />
                        ) : (
                            <div className="w-full h-full bg-black flex items-center justify-center">
                                <PlayCircle className="text-white w-8 h-8" /> {/* 영상임을 표시하는 아이콘 */}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
