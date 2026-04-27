'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { AnimatePresence, easeInOut, motion } from "framer-motion"

import { NAV_ITEMS } from '@/constants/navigation'
import { X } from "lucide-react"

interface MenuDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function MenuDrawer({isOpen, onClose}: MenuDrawerProps) {
    const pathname = usePathname();
    const savePathname = useRef(pathname); // 현재주소 저장

    useEffect(() => {
        if(savePathname.current !== pathname ){
            onClose();
        }
    } , [pathname, onClose])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // 스크롤 잠금
        } else {
            document.body.style.overflow = 'unset'; //스크롤 해제
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    } ,[isOpen])

    return (
        <AnimatePresence>
            {isOpen && ( 
                <div className="fixed inset-0 z-[100]">
                    {/* 배경오버레이  모션 */}
                    <motion.div onClick={onClose}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className="fixed inset-0 z-[105] bg-black/50 backdrop-blur-sm "
                    />
                    {/* 사이드 메뉴 */}
                    <motion.aside onClick={onClose}
                                initial={{x: '100%'}} // 오른쪽 화면 빆에서 시작
                                animate={{x: 0}}
                                exit={{x: '100%'}}
                                transition={{duration: 0.4, ease: 'easeInOut'}}
                                className='fixed top-0 right-0 z-[115] w-4/5 max-w-4xl h-screen bg-white'>
                        <div className="px-5 md:px-10 lg:px-15 py-5 flex flex-col gap-10">
                            <div className="flex gap-5 items-center justify-end pb-5 border-b border-gray-200">
                                <Link href={'/support'}
                                    className='px-5 py-2 border rounded-full font-bold text-sm hidden md:block bg-main text-white hover:bg-main/70 cursor-pointer'
                                >
                                    고객 지원
                                </Link>
                                <button onClick={onClose} className="cursor-pointer">
                                    <X className="text-gray-800"/>
                                </button>
                            </div>
                            <ul className="flex flex-col gap-8 md:gap-13">
                                {NAV_ITEMS.map( (item, idx) => (
                                    <li key={item.label} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]">
                                        <Link href={item.href} className="text-lg md:text-xl font-bold hover:text-main cursor-pointer">{item.label}</Link>
                                        {item.items && item.items.length > 0 && (
                                            <div className="mt-4 md:mt-7 lg:mt-0 grid gap-3 grid-cols-1 lg:grid-cols-4">
                                                {item.items.map(subItem => (
                                                    <Link  key={subItem.label} href={subItem.href}
                                                        className="text-base md:text-lg text-gray-700 hover:text-black cursor-pointer"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    )
}
