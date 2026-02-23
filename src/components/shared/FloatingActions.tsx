'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { ArrowUp, MessageCircle } from 'lucide-react'

export default function FloatingActions() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const pathname = usePathname();

    const isProductDetaiilPage = pathname.startsWith('/products/')

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 400) { // 400px이상 내려오면
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 상단 이동 함수
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
    <div className={cn('sticky bottom-5 md:bottom-15 mb-10 ml-auto mr-5 md:mr-10 z-[90]', 
                        'w-fit h-fit flex flex-col gap-3 md:gap-4',
                        isProductDetaiilPage && 'max-md: bottom-24'
                    )}>
        <AnimatePresence>
            {/* 상단이동 버튼(조건부) */}
            {showTopBtn && (
                <motion.button key='top-btn'
                                initial={{opacity: 0, y: 20, scale: 0.8}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: 20, scale: 0.8}}
                                onClick={scrollToTop}
                                className='p-3 md:p-4 bg-main rounded-full shadow-lg text-white cursor-pointer'
                                title='맨 위로'
                >   
                    <ArrowUp size={24} strokeWidth={2.5} className=''/>
                </motion.button>
            )}
            {/* 문의 버튼 (항시 노출) */}
            <motion.button key='contact-btn'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='p-3 md:p-4 bg-main rounded-full shadow-lg text-white cursor-pointer'
                            title='문의하기'
            >   
                <Link href='/support'>
                    <MessageCircle size={24} strokeWidth={2.5} className=''/>
                </Link>
            </motion.button>
        </AnimatePresence>
    </div>
    )
}
