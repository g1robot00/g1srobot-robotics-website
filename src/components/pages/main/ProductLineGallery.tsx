import React from 'react'

export default function ProductLineGallery() {
    return (
        <AnimatePresence mode="wait">
            <motion.div className='relative w-full h-full bg-gray-800 rounded-2xl overflow-hidden'
                key={activeId} // activeId가 바뀔때마다 애니메이션 트리거
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* 현재 activeId에 맞는 이미지 출력 */}
                {productLines[activeId].thumbnail
                    ? <Image src={productLines[activeId].thumbnail}
                        alt={productLines[activeId].label}
                        fill
                        className='object-cover bg-gray-700'
                    />
                    : <ImagePlaceholder size='lg' />
                }
            </motion.div>
        </AnimatePresence>
    )
}
