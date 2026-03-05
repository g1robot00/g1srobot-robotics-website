'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { ArrowUp, MessageCircle } from 'lucide-react'

export default function FloatingActions() {
    const IconStyles = 'w-6 h-6 md:w-8 md:h-8 ';
    const IconBoxStyles = 'p-3 md:p-4 bg-main rounded-full shadow-lg text-white cursor-pointer'

    const [showTopBtn, setShowTopBtn] = useState(false);
    const [bottom, setBottom] = useState(20);
    const pathname = usePathname();

    const isProductDetailPage = pathname.startsWith('/products/');

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            // 상단 이동버튼
            setShowTopBtn(window.scrollY > 400); // 400px이상 내려오면

            // 푸터 밀림계산
            const footer = document.querySelector('footer');
            if(!footer) return;

            const footerRect = footer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 기기별 높이계산
            let baseBottom = 20;
            if (window.innerWidth >= 768) {
                baseBottom = 60; // md:bottom-15 (3.75rem = 60px)
            } else if (isProductDetailPage) {
                baseBottom = 96; // max-md:bottom-24 (6rem = 96px)
            }
            const overlap = viewportHeight - footerRect.top;

            if(overlap > 0) {
                setBottom(baseBottom + overlap);
            } else {
                setBottom(baseBottom);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // ✨ 화면 크기가 바뀔 때도 기준점이 변해야 하므로 resize 이벤트 추가
        window.addEventListener('resize', handleScroll);
        handleScroll(); //초기 1회 실행
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        }
    }, []);

    // 상단 이동 함수
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <motion.div animate={{ bottom }} 
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30
                    }}
            className={cn('fixed right-5 md:right-10 z-[90]',
                            'w-fit h-fit flex flex-col gap-3 md:gap-4',
                            // isProductDetailPage && 'max-md: bottom-24',
                        )}
        >
            <AnimatePresence>
                {/* 상단이동 버튼(조건부) */}
                {showTopBtn && (
                    <motion.button key='top-btn'
                                    initial={{opacity: 0, y: 20, scale: 0.8}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    exit={{opacity: 0, y: 20, scale: 0.8}}
                                    onClick={scrollToTop}
                                    className={IconBoxStyles}
                                    title='맨 위로'
                    >
                        <ArrowUp strokeWidth={2.5} className={IconStyles}/>
                    </motion.button>
                )}
                {/* 문의 버튼 (항시 노출) */}
                <motion.button key='contact-btn'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={IconBoxStyles}
                                title='문의하기'
                >
                    <Link href='/support'>
                        <MessageCircle strokeWidth={2.5} className={IconStyles}/>
                    </Link>
                </motion.button>
            </AnimatePresence>
        </motion.div>
    )
}
