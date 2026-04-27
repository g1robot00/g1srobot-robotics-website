import React from 'react'

import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface ProductIntroButtonProps {
    onInquiryClick: () => void
    productId: string
    hasDocs: boolean
}

export default function ProductIntroButton({onInquiryClick, productId, hasDocs}: ProductIntroButtonProps) {
    const buttonStyle = 'flex-1 justify-start text-md h-15';
  return (
    <div className={cn(
                'w-full fixed bottom-0 left-0 z-50  flex gap-3  px-5 py-2 bg-white border-t border-gray-100',
                'md:relative md:bottom-auto md:left-auto md:z-0   md:p-0 md:bg-transparent md:border-none '
                )}>
        <Button label='제품 문의하기' onClick={onInquiryClick} className={buttonStyle} showArrow />
        <Button href={`/tech-doc?productId=${productId}`} label='다운로드' disabled={!hasDocs} className={cn(buttonStyle)} showArrow/>
    </div>
  )
}
