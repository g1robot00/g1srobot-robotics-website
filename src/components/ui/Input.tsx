'use client'

import { forwardRef } from 'react'

import { INPUT_STYLE } from '@/constants/styles'
import { cn } from '@/lib/utils'

interface InputProps 
extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>
{
    label: string
    required?: boolean
    isTextArea?: boolean
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
    label,
    required = false,
    isTextArea = false,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={INPUT_STYLE.frame}
        >
            {/* 라벨 영역 */}
            <div className="flex items-center gap-1 font-bold text-gray-800 py-2">
                {label}
                {required && <span className="text-main text-xl font-extra-bold">*</span>}
            </div>

            {/* 입력 영역 */}
            <div className="w-full">
                {isTextArea ? (
                    <textarea
                        ref = {ref as React.ForwardedRef<HTMLTextAreaElement>}
                        className={cn(INPUT_STYLE.input, "h-40 resize-none", className)}
                        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                ) : (
                    <input ref={ref as React.ForwardedRef<HTMLInputElement>}
                        className={cn(INPUT_STYLE.input, className)}
                        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                    />
                )}
            </div>
        </div>
    )
})

Input.displayName = "Input"; // 디버깅용 이름 설정
export default Input;
