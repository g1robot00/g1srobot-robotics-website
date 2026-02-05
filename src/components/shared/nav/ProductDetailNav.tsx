'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import NavItem from './NavItem'
import MenuDrawer from './MenuDrawer'
import Nav from './Nav'
import { Menu } from 'lucide-react';


export default function ProductDetailNav() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY])
    
    const [showMenu, setShowMenu] = useState(false);

    
    return (
        <>
            <button className='z-[100]'>
                <Menu className='cursor-pointer'/>
            </button>
            {showMenu && <Nav />}
        </>
        // <nav className={cn('z-[100] w-full h-15 md:h-20 flex items-center justify-center transition-all duration-500 bg-white border border-b border-gray-200 text-gray-700',
        //     isVisible ? 'translate-y-0' : '-translate-y-full'
        // )}>
        //     <div className='w-full max-w-screen-2xl px-4 md:px-8 lg:px-12 flex items-center justify-between '>
        //         <Link href='/'>
        //             <Image className="dark:invert "
        //                 src="/next.svg"
        //                 alt="Next.js logo"
        //                 width={100}
        //                 height={20}
        //                 priority
        //             />
        //         </Link>
        //         <ul className='hidden lg:flex gap-6'>
        //             {NAV_ITEMS.map(i => (
        //                 <NavItem key={i.href} href={i.href}>{i.label}</NavItem>
        //             ))}
        //         </ul>
        //         <div className='flex gap-7 items-center'>
        //             <Link href={'/support'}
        //                 className='px-5 py-2 bg-main rounded-full
        //                             text-white text-sm hidden md:block'
        //             >
        //                 고객 지원
        //             </Link>
        //             <Menu className='cursor-pointer'/>
        //         </div>
        //     </div>
        // </nav>
    )
}
