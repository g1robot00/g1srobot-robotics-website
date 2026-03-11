import Link from 'next/link'

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
    category: string
    title: string
    theme?: 'light' | 'dark'
    className?: string
    href?: string
}

export default function SectionHeader({
    category,
    title,
    theme = 'light',
    className,
    href,
}: SectionHeaderProps) {
    return (
        <div className={cn('flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20', className)}>
            <div className='flex flex-col gap-5 md:max-w-[60%]'>
                <h3 className='text-base md:text-lg text-main font-medium'>{category}</h3>
                <h2 className={cn('text-3xl md:text-5xl 3xl:text-6xl font-bold leading-snug tracking-tight whitespace-pre-wrap', 
                                theme === 'light' ? 'text-gray-900' : 'text-white')}
                >
                    {title}
                </h2>
            </div>
            { href &&
                <Link href={href} className="flex-shrink-0 text-gray-400 text-sm md:text-base hover:text-main transition-colors font-bold">
                    View All {category} →
                </Link>
            }
        </div>
    )
}
