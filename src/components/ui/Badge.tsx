import { cn } from "@/lib/utils"

interface BadgeProps {
    label: string
    variant?: 'filled' | 'outline' | 'filter'
    isActive?: boolean
    onClick?: () => void
    prefix?: string
    className?: string
}

export default function Badge({
    label,
    variant = 'filled',
    isActive = true,
    onClick,
    prefix,
    className = ''
}: BadgeProps) {
    const baseStyles = 'transition-colors duration-300'

    const variantStyles = {
        filled: 'text-[12px] px-3 py-1 bg-main text-white font-semibold tracking-tight shadow-md rounded-md',
        outline: 'text-[12px] px-2 py-0.5 border border-white/50 rounded-full ',
        filter: `px-4 py-1.5 border rounded-full
                ${isActive
                ? 'border-main text-main font-semibold bg-main/5 cursor-pointer' 
                : 'border-gray-200 text-gray-400 bg-transparent hover:bg-main/5 hover:border-main hover:text-main cursor-pointer'}`
    }

    return (
        <span onClick={onClick}
                className={cn(baseStyles, variantStyles[variant], className)}>
            {prefix && <span>{prefix}</span>}
            {label}
        </span>
    )
}
