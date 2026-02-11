import React from 'react'

import Container from '@/components/shared/Container'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/motions/ScrollReveal'

interface SectionHeaderProps {
    category: string
    title: string
    children?: React.ReactNode
    theme?: 'light' | 'dark'
    className?: string
}

export default function SectionHeader({
    category,
    title,
    children,
    theme = 'light',
    className
}: SectionHeaderProps) {
    return (
        <ScrollReveal>
            <Container className={className}>
                <div className='grid grid-cols-1 md:grid-cols-4 mb-20'>
                    <div className='md:col-span-3 flex flex-col gap-5'>
                        <h3 className='text-base md:text-lg text-main '>{category}</h3>
                        <h2 className={cn('text-3xl md:text-5xl font-bold leading-tight tracking-tight', theme === 'light' ? 'text-gray-900' : 'text-white')}>
                            {title}
                        </h2>
                    </div>
                </div>
                <div className=''>
                    {children}
                </div>
            </Container>
        </ScrollReveal>
    )
}
