import React from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({children, className}: ContainerProps) {
  return (
    <div className={cn('w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-20', className)}>
      {children}
    </div>
  )
}
