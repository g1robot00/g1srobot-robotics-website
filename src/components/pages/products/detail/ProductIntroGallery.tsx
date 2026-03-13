'use client'

import { useState } from "react"
import Image from "next/image"

import ImagePlaceholder from "@/components/ui/ImagePlaceholder"
import ProductThumbnails from "./ProductThumbnails"

interface ProductIntroGalleryProps {
    imgUrls: string[],
    videoUrls: string[],
    name: string
}

export default function ProductIntroGallery({ imgUrls, videoUrls, name }: ProductIntroGalleryProps) {
    const allMedia = [
        ...(imgUrls?.map(url => ({ type: 'image', url })) ?? []),
        ...(videoUrls?.map(url => ({ type: 'video', url })) ?? [])
    ]
    const [activeIndex, setActiveIndex] = useState(0);
    const currentMedia = allMedia[activeIndex];

    const renderMainMedia = () => {
        if (!currentMedia) return <ImagePlaceholder size='md'/>; // 데이터 로딩 지연 대비

        if (currentMedia.type === 'image'){
            return (
                <Image src={currentMedia.url}
                    alt={`${name} main`}
                    fill
                    priority
                    className='object-contain'
                    sizes="(max-width: 768px)100vw, 55vw"
                    quality={90}
                />
            )
        }

        else if (currentMedia.type === 'video') {
            return (
                <video 
                        src={currentMedia.url}
                        controls
                        className='w-full h-full object-contain'
                />
            )
        }

        return <ImagePlaceholder size='md'/>
    }

    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <div className='relative w-full h-full max-h-full aspect-[4/3] bg-gray-50 overflow-hidden'>
                    { currentMedia
                        ?  renderMainMedia()
                        : <ImagePlaceholder size='md'/>
                    }
                </div>
            </div>
            { allMedia.length > 1 && 
                <div className='w-full flex-shrink-0'>
                    <ProductThumbnails 
                        allMedia={allMedia} 
                        name={name} 
                        activeIndex={activeIndex} 
                        setActiveIndex={setActiveIndex}
                    />
                </div>
            }
        </div>
    )
}
