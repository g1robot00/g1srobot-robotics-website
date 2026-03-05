import React from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({children, className}: ContainerProps) {
  return (
    // 변경시 UseCaseSection 너비설정 변경
    <div className={cn('mx-auto w-full max-w-[1440px] 3xl:max-w-[1840px] px-5 md:px-10 xl:px-20', className)}>  
      {children}
    </div>
  )
}
