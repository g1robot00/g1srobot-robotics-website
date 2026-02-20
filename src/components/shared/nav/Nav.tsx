'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { NAV_ITEMS, NAV_HEIGHT } from '@/constants/navigation'
import MenuDrawer from './MenuDrawer'
import { NavItem } from '@/types/nav'
import { Menu } from 'lucide-react';


export default function Nav({noTransparent = false} : {noTransparent?: boolean}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHoverd, setIsHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavItem | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const isTransparent = isAtTop && !isHoverd && !activeMenu && !noTransparent;

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
    <>
      <nav onMouseLeave={() => setActiveMenu(null)} // 네브영역 벗어나면 서브네브 닫기
            className={cn('fixed top-0 left-0 z-[100] w-full border transition-all duration-500',
                isVisible ? 'translate-y-0' : '-translate-y-full',
                isTransparent
                ? 'bg-transparent border-transparent text-white/85 '
                : 'bg-white border-b border-gray-200 text-gray-700'
              )}
      >
        {/* 상단 메인 메뉴바 */}
        <div className={`w-full ${NAV_HEIGHT.h} flex items-center justify-center`}>
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
            <ul onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className='hidden lg:flex gap-6'
            >
              {NAV_ITEMS.map(item => (
                <li key={item.label}
                    onMouseEnter={() => setActiveMenu(item)}
                    className='p-3'
                >
                    <Link href={item.href} className='lg:text-lg font-bold hover:text-main hover:cursor-pointer block'>
                        {item.label}
                    </Link>
                </li>
              ))}
            </ul>
            <div className='flex gap-7 items-center'>
              <Link href={'/support'}
                    className={cn('px-5 py-2 border rounded-full font-bold text-sm hidden md:block',
                              isTransparent? 'border-white text-white hover:bg-white/40': 'bg-main text-white hover:bg-main/70'
                    )}
              >
                고객 지원
              </Link>
              <button onClick={() => setShowMenu(true)} className='cursor-pointer'>
                <Menu />
              </button>
            </div>
          </div>
        </div>
        {/* 서브메뉴 영역 */}
        {activeMenu?.items && activeMenu.items.length > 0 && (
          <div className='w-full bg-white border-t border-gray-100 py-7 animate-in fade-in slide-in-from-top-2'>
            <ul className='max-w-screen-2xl mx-auto px-12 flex justify-center gap-20'>
              {activeMenu.items.map(sub => (
                <li key={sub.label}>
                  <Link href={sub.href} className='lg:text-lg hover:text-main hover:cursor-pointer block'>
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      
      <MenuDrawer isOpen={showMenu} onClose={() => setShowMenu(false)}/>
    </>
  )
}
