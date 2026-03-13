import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import Portal from '@/components/shared/Portal'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Container from '@/components/shared/Container'
import Badge from '@/components/ui/Badge'
import { UseCaseDTO } from '@/types/respDto'
import { X } from 'lucide-react'

interface UseCaseOverlayProps {
    useCase: UseCaseDTO
    onClose: () => void
}

export default function UseCaseOverlay({ useCase, onClose }: UseCaseOverlayProps) {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {document.body.style.overflow = originalStyle;}
    }, []);

    return (
        <Portal>
            <div className='fixed inset-0 z-[110] flex items-center justify-center  px-4 md:px-10 xl:px-20 3xl:!px-30'>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                    onClick={onClose}
                    className='absolute inset-0 bg-black/40 backdrop-blur-lg '
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={cn('relative z-10 w-full max-w-[1440px] 3xl:max-w-[1680px] max-h-[90vh] md:max-h-[80vh] 3xl:!h-[800px] ' ,
                                    'bg-white p-5 md:p-10 rounded-3xl shadow-2xl',
                                    'flex flex-col gap-2 md:gap-5')}
                >
                    <div className='flex justify-end'>
                        <button onClick={onClose} className='p-0 md:p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors cursor-pointer '>
                            <X />
                        </button>
                    </div>
                    <div className={cn('flex flex-col lg:flex-row gap-6 md:gap-10',
                                    'flex-1 min-h-0 overflow-hidden')}
                    >
                        <div className='lg:flex-[1.2] 3xl:flex-[1.5] relative w-full overflow-hidden aspect-[4/3] bg-gray-100 self-start'>
                            { useCase?.thumbnail 
                                ? <Image 
                                    src={useCase.thumbnail} 
                                    alt={useCase.title || 'UseCase detail'} 
                                    fill 
                                    priority
                                    className='object-contain'
                                    sizes="100vw"
                                    quality={90}
                                />
                                : <ImagePlaceholder  size='md'/> 
                            }
                        </div>
                        <div className='flex-1 flex flex-col gap-8  min-h-0 overflow-y-auto'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-wrap gap-2'>
                                    {useCase.industries.map(item => <Badge key={item.id} label={item.name} className='shadow-none'/>)}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight">{useCase.title}</h2>
                            </div>
                            <div className='grid grid-cols-[150px_1fr] gap-y-4 text-sm md:text-base border-y border-gray-100 py-6'>
                                <span className='text-gray-400 font-medium'>적용 시스템</span>
                                <div className='flex flex-col gap-1 font-semibold text-gray-700'>
                                    {useCase.systems.map(item =>
                                        <p key={item.id} className="w-fit px-2 py-1 bg-gray-100 text-gray-600 text-xs md:text-sm rounded-md font-medium">{item.name}</p>
                                    )}
                                </div>
                                <span className='text-gray-400 font-medium'>적용 날짜</span>
                                <span className='font-semibold text-gray-700'>{useCase.date}</span>
                            </div>
                            <p className="text-sm md:text-base text-gray-600 whitespace-pre-wrap pb-10">
                                {useCase.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Portal>
    )
}
