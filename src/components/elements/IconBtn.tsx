import React from 'react'
import Link from 'next/link';

import IconRenderer from '../ui/IconRenderer';

interface IconBtnProps {
    label: string;
    icon: string;
    href: string;
}

export default function IconBtn({ label, icon, href }: IconBtnProps) {
  return (
    <Link href={href} 
          className='flex gap-3 items-center justify-center
                    w-full h-15 px-5 py-2 bg-gray-200/60 rounded-lg text-gray-700/60'
    >
        <IconRenderer iconName={icon} size={25} strokeWidth={2}/>
        <span className='text-sm md:text-base font-semibold'>{label}</span>
    </Link>
  )
}
