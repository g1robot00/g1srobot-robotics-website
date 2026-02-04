'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import { NAV_ITEMS } from '@/constants/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NavDropbar() {
    const pathname = usePathname(); // 현재경로
    const currentMenu = NAV_ITEMS.find(item => pathname.startsWith(item.href)) || NAV_ITEMS[0]; // 현재경로와 일치하는 메뉴찾기
    const [openMenu, setOpenMenu] = useState<'parent' | 'child' | null>(null);

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


    return (
        <div className='relative py-3 flex items-center
                        bg-black/40 backdrop-blur-md 
                        rounded-full cursor-pointer hover:bg-black/60 transition-all'>
            <div className='relative'>
                <button onClick={() => toggleMenu('parent')}
                    className='px-8 flex items-center gap-1 cursor-pointer whitespace-nowrap'>
                    {parentItem.label}
                    {openMenu ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openMenu === 'parent' &&
                    <ul className='absolute top-[calc(100%+15px)] left-0 z-50
                                min-w-full w-max py-2 bg-white shadow-xl rounded-xl  
                                text-black'>
                        {NAV_ITEMS.map(item => (
                            <li key={item.href} className='hover:bg-gray-100'>
                                <Link href={item.href} className={`block px-5 py-2 ${pathname.startsWith(item.href) ? 'text-main font-bold' : ''}`}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                }
            </div>

            {parentItem.items && parentItem.items.length > 0 && (
                <>
                    <span className="mx-1 opacity-30">|</span>
                    <div className='relative'>
                        <button
                            onClick={() => toggleMenu('child')}
                            className='px-8 flex items-center gap-1 cursor-pointer whitespace-nowrap'
                        >
                            {currentChild?.label || parentItem.label}
                            {openMenu === 'child' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {openMenu === 'child' && (
                            <ul className='absolute top-[calc(100%+15px)] left-0 min-w-full w-max bg-white text-black shadow-xl rounded-xl py-2 z-50'>
                                {parentItem.items.map(sub => (
                                    <li key={sub.href} className='hover:bg-gray-100'>
                                        <Link href={sub.href} className={`block px-5 py-2 ${pathname === sub.href ? 'text-main font-bold' : ''}`}>
                                            {sub.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
