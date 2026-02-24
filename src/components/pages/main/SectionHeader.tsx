import { cn } from '@/lib/utils'

interface SectionHeaderProps {
    category: string
    title: string
    theme?: 'light' | 'dark'
    className?: string
}

export default function SectionHeader({
    category,
    title,
    theme = 'light',
    className
}: SectionHeaderProps) {
    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 mb-15 md:mb-20', className)}>
            <div className='md:col-span-1 flex flex-col gap-5'>
                <h3 className='text-base md:text-lg text-main '>{category}</h3>
                <h2 className={cn('text-3xl md:text-5xl font-bold leading-tight tracking-tight ', theme === 'light' ? 'text-gray-900' : 'text-white')}>
                    {title}
                </h2>
            </div>
        </div>
    )
}
