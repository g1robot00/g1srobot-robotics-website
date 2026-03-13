import React from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { ProductLineListDTO } from '@/types/respDto';

interface ProductLineGalleryProps {
    previews: Pick<ProductLineListDTO, 'thumbnail' | 'label'>[];
    activeId: number;
}

export default function ProductLineGallery({previews, activeId}: ProductLineGalleryProps) {
    const isActive = previews[activeId];
    return (
        <AnimatePresence mode="wait">
            <motion.div className='relative w-full h-full bg-black rounded-2xl overflow-hidden'
                key={activeId} // activeId가 바뀔때마다 애니메이션 트리거
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* 현재 activeId에 맞는 이미지 출력 */}
                {isActive.thumbnail
                    ? <Image src={isActive.thumbnail}
                        alt={isActive.label}
                        fill
                        className='object-contain bg-gray-700'
                        sizes="(max-width: 1024px) 1px, 70vw"
                        quality={85}
                    />
                    : <ImagePlaceholder size='lg' />
                }
            </motion.div>
        </AnimatePresence>
    )
}
