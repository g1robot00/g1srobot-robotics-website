'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { ACCORDION_VARIANTS } from '@/constants/motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function NavDropbar() {
    const pathname = usePathname(); // 현재경로
    // const currentMenu = NAV_ITEMS.find(item => pathname.startsWith(item.href)) || NAV_ITEMS[0]; // 현재경로와 일치하는 메뉴찾기
    const [openMenu, setOpenMenu] = useState<'parent' | 'child' | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // 1. 부모 찾기
    const parentItem = NAV_ITEMS.find(item =>
        pathname === item.href || ('items' in item && item.items?.some(sub => pathname === sub.href))
    )

    // 2. 자식 찾기
    const currentChild = parentItem?.items?.find(sub => pathname === sub.href)

    // 부모가 없으면 아무것도 안 보여줌 (예: 메인페이지)
    if (!parentItem) return null;

    // 메뉴 토글 함수
    const toggleMenu = (menu: 'parent' | 'child') => {
        setOpenMenu(prev => prev === menu ? null : menu);
    };

    // 외부클릭시 닫음
    useEffect(() => {
        if(!openMenu) return;

        const handleOutsideClick = (e: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenu(null);
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);
        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [openMenu]);


    return (
        <div ref={menuRef} 
            className={cn('relative py-3 flex items-center',
                'bg-black/40 backdrop-blur-md',
                'rounded-full cursor-pointer hover:bg-black/60 transition-all')}
        >
            <div className='relative'>
                <button onClick={() => toggleMenu('parent')}
                    className='block px-8 flex items-center gap-1 cursor-pointer whitespace-nowrap text-sm md:text-base'>
                    {parentItem.label}
                    <ChevronDown size={14} className={`transition-transform ${openMenu === 'parent' && 'rotate-180'}`}/>
                </button>
                <AnimatePresence>
                    {openMenu === 'parent' &&
                        <motion.ul
                            variants={ACCORDION_VARIANTS}
                            initial="initial" 
                            animate="animate"
                            exit="exit"
                            transition= {ACCORDION_VARIANTS.transition}
                            className='absolute top-[calc(100%+15px)] left-0 z-50
                                min-w-full w-max px-2 py-4 bg-white shadow-xl rounded-xl overflow-hidden
                                text-black'
                        >
                            {NAV_ITEMS.map(item => (
                                <li key={item.href} 
                                    className='rounded-lg hover:bg-gray-100'
                                >
                                    <Link href={item.href} className={`block px-5 py-2 ${pathname.startsWith(item.href) ? 'text-main font-bold' : ''}`}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    }
                </AnimatePresence>
            </div>

            {parentItem.items && parentItem.items.length > 0 && (
                <>
                    <span className="mx-1 opacity-30">|</span>
                    <div className='relative'>
                        <button
                            onClick={() => toggleMenu('child')}
                            className='block px-8 flex items-center gap-1 cursor-pointer whitespace-nowrap text-sm md:text-base'
                        >
                            {currentChild?.label || parentItem.label}
                            <ChevronDown size={14} className={`transition-transform ${openMenu === 'child' && 'rotate-180'}`}/>
                        </button>
                        {openMenu === 'child' && (
                            <motion.ul
                                variants={ACCORDION_VARIANTS}
                                initial="initial" 
                                animate="animate"
                                exit="exit"
                                transition= {ACCORDION_VARIANTS.transition}
                                className='absolute top-[calc(100%+15px)] left-0 z-50 
                                    min-w-full w-max px-2 py-4 bg-white shadow-xl rounded-xl overflow-hidden  text-black '
                            >
                                {parentItem.items.map(sub => (
                                    <li key={sub.href} className='hover:bg-gray-100'>
                                        <Link href={sub.href} className={`block px-5 py-2 ${pathname === sub.href ? 'text-main font-bold' : ''}`}>
                                            {sub.label}
                                        </Link>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
