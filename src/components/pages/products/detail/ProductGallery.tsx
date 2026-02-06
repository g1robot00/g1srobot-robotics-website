'use client'

import { useState } from "react"
import Image from "next/image"

import ProductThumbnails from "./ProductThumbnails"
import { PlayCircle } from "lucide-react"

interface ProductGalleryProps {
    imgUrls: string[],
    videoUrls: string[],
    name: string
}

export default function ProductGallery({ imgUrls, videoUrls, name }: ProductGalleryProps) {
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
        <div className='flex flex-col items-center h-full w-full'>
            <div className="flex-1 w-full min-h-0 flex items-center jutify-center">
                <div className='relative w-full h-full md:max-w-[95%] max-h-full aspect-[4/3] bg-gray-100 overflow-hidden'>
                    {currentMedia.type === 'image'
                        ?<Image src={allMedia[activeIndex].url}
                            alt={`${name} main`}
                            fill
                            priority
                            className='object-contain'
                        />
                        : <video key={allMedia[activeIndex].url}
                                src={allMedia[activeIndex].url}
                                controls
                                className='w-full h-full object-contain'
                        />
                    }
                </div>
            </div>
            <div className='w-full flex-shrink-0'>
                <ProductThumbnails allMedia={allMedia} 
                                    name={name} 
                                    activeIndex={activeIndex} 
                                    setActiveIndex={setActiveIndex}
                />
            </div>
        </div>
    )
}
