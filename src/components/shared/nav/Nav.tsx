'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import NavItem from './NavItem'
import { Menu } from 'lucide-react';


export default function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. 투명도 감지(맨 위 50px)
      setIsAtTop(currentScrollY < 50);

      // 2. 방향 감지 (아래로 내리면 숨기고, 위로 올리면 보여줌)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[lastScrollY])

  return (
    <nav className={cn('fixed top-0 left-0 z-[100] w-full h-15 md:h-20 flex items-center justify-center transition-all duration-500',
      isVisible ? 'translate-y-0' : '-translate-y-full',
      isAtTop 
      ? 'bg-transparent border-transparent text-white/70 '
      : 'bg-white border border-b border-gray-200 text-gray-700' 
    )}>
      <div className='w-full max-w-screen-2xl px-4 md:px-8 lg:px-12 flex items-center justify-between '>
        <Link href='/'>
          <Image className="dark:invert "
                  src="/next.svg"
                  alt="Next.js logo"
                  width={100}
                  height={20}
                  priority
          />
        </Link>
        <ul className='hidden lg:flex gap-6'> 
          {NAV_ITEMS.map(i => (
            <NavItem key={i.href} href={i.href}>{i.label}</NavItem>
          ))}
        </ul>
        <div className='flex gap-7 items-center'>
          <Link href={'/support'}
                className={cn('px-5 py-2 border rounded-full font-bold text-sm hidden md:block',
                          isAtTop? 'border-white text-white hover:bg-white/40': 'bg-main text-white hover:bg-main/70'
                )}      
          >
            고객 지원
          </Link>
          <button className='cursor-pointer'>
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  )
}
