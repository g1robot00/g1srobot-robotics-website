import React from 'react'

import IconRenderer from '@/components/ui/IconRenderer';
import type { ContactItem } from '@/types/respDto'

interface ContactItemProps {
  info: ContactItem
}

export default function ContactItem({info}: ContactItemProps) {
  const {iconName, value} = info;
  
  return (
    <div className='flex gap-7 text-xs font-bold md:text-base md:font-normal'>
      <IconRenderer iconName={iconName} size={20}/>
      <span>{value}</span>
    </div>
  )
}
