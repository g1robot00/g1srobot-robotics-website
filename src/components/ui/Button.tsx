import Link from 'next/link'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement> 
{
    label: string | React.ReactNode
    variant?: 'filled' | 'outline'
    href?: string
    showArrow?: boolean
    className?: string
    onClick?: () => void
    noMinWidth?: boolean
}

export default function Button({ 
    label, 
    variant = 'filled',
    className,
    onClick,
    noMinWidth = false,
    ...props
}: ButtonProps) {
    const baseStyles = `${ noMinWidth ? 'p-2' :'min-w-40 px-4 py-2'} rounded-md 
                        flex justify-center items-center 
                        text-lg font-semibold cursor-pointer`
    
    const variantStyles = {
        filled: 'bg-main text-white hover:bg-main/70',
        outline: 'border border-main text-main hover:bg-main/10'
    }

    // const disabledStyles = 'opacity-40 grayscale active:scale-100 shadow-none'
    return (
        <button onClick={onClick} 
                className={cn(
                    baseStyles, 
                    variantStyles[variant], 
                    className)}
                {...props}
        >
            {label}
        </button>
    )
}
