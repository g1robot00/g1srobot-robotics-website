import Link from 'next/link'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement> 
{
    label: string | React.ReactNode
    variant?: 'filled' | 'outline'
    href?: string,
    disabled?: boolean
    showArrow?: boolean
    className?: string
    onClick?: () => void
    noMinWidth?: boolean
}

export default function Button({ 
    label, 
    variant = 'filled',
    href,
    disabled = false,
    showArrow = false,
    className,
    onClick,
    noMinWidth = false,
    ...props
}: ButtonProps) {
    const isLink = href && !disabled

    const baseStyles = cn(noMinWidth ? 'p-2' :'min-w-40 px-4 py-2', 
                        'rounded-md flex justify-center items-center text-base md:text-lg font-semibold',
                        disabled ? 'opacity-50 cursor-not-allowed grayscale': 'cursor-pointer')
    
    const variantStyles = {
        filled: 'bg-main text-white hover:bg-main/70',
        outline: 'border border-main text-main hover:bg-main/70'
    }

    const Content = (
        <>
            {label}
            {showArrow && <ChevronRight size={20} className='group-hover:translate-x-1 transition-transform'/>}
        </>
    )

    if(isLink) {
        return (
            <Link href={href} 
                className={cn(
                    baseStyles, 
                    variantStyles[variant],
                    'group',
                    className)}
            >
                {Content}
            </Link>
        )
    }

    return (
        <button onClick={onClick} 
                className={cn(
                    baseStyles, 
                    variantStyles[variant],
                    'group',
                    className)}
                {...props}
        >
            {Content}
        </button>
    )
}
