import React from 'react'

import { INPUT_STYLE } from '@/constants/styles'
import { cn } from '@/lib/utils'

interface FormFieldProps 
extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>
{
    label: string
    required: boolean
    children: React.ReactNode
    className?: string
}

export default function FormField({
    label,
    required = false,
    children,
    className
}: FormFieldProps) {

    return (
        <div className={cn(INPUT_STYLE.frame, className)}>
            <div className='flex items-center gap-1 font-bold text-gray-800 py-2'>
                {label}
                {required && <span className='text-main'>*</span>}
            </div>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}
