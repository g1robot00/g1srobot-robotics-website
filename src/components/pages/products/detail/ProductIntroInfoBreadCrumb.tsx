import React from 'react'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { ACCORDION_VARIANTS } from '@/constants/motion'
import { UniversalDetailDTO, DetailNavDTO } from '@/types/respDto'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface ProductIntroInfoBreadCrumbProps {
    product: UniversalDetailDTO
    contextList: DetailNavDTO[]
    from?: 'industry' | 'productLine'
}

export default function ProductIntroInfoBreadCrumb({ product, contextList, from }: ProductIntroInfoBreadCrumbProps) {
    const [openMenu, setOpenMenu] = useState(false);
    const [openInnerMenuId, setOpenInnerMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null); // 메뉴 감싸는 영역에 연결
    const industryJoin = product.industries && product.industries.length > 0 
                        ? product.industries.join(' / ') 
                        : null;

    // 외부클릭시 닫음
    useEffect(() => {
        if (!openMenu) return;

        const handleOutsideClick = (e: MouseEvent) => {
            // 클릭된 요소가 menuRef내부에 포함되어있지 않으면 닫음
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenu(false);
                setOpenInnerMenuId(null);
            }
        };

        if (openMenu) {
            window.addEventListener('mousedown', handleOutsideClick);
        };

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openMenu]);



    return (
        <div className="flex items-center gap-1 text-sm font-medium text-gray-400 mb-2">
            <span className='flex-shrink-0'>{from === 'industry' ? '산업별 솔루션' : '제품 및 서비스'}</span>
            <ChevronRight size={12} />

            {industryJoin &&
                <div ref={menuRef} className="relative min-w-0 flex-shrink-1">
                    <button onClick={() => { setOpenMenu(prev => !prev); openMenu === false && setOpenInnerMenuId(null); }}
                        className="flex items-center gap-1 text-main font-bold cursor-pointer max-w-full"
                    >
                        <span className='truncate min-w-0'>{from === 'industry' ? industryJoin : product.productLine}</span>
                        <ChevronDown size={14} className={cn("flex-shrink-0 transition-transform", openMenu === true && "rotate-180")} />
                    </button>

                    {/* 드롭다운 리스트 */}
                    {openMenu &&
                        <motion.ul
                            variants={ACCORDION_VARIANTS}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={ACCORDION_VARIANTS.transition}
                            className={cn(
                                "absolute top-full z-50 left-0 mt-2 py-3 bg-white border border-gray-100 rounded-xl shadow-2xl",
                                "w-max min-w-[200px] max-w-[240px] md:max-w-[300px]",
                                "max-h-[350px] overflow-y-auto")}
                        >
                            {contextList.map(item => (
                                <li key={item.id} className='block px-5 py-2'>
                                    <button onClick={() => setOpenInnerMenuId(prev => prev === item.id ? null : item.id)}
                                        className='flex items-center text-black cursor-pointer '
                                    >
                                        <p className='font-bold'>{item.name}</p>
                                        <ChevronDown size={14} />
                                    </button>
                                    {openInnerMenuId === item.id &&
                                        <div className='mt-2 border-l-2 border-gray-200 flex flex-col gap-1'>
                                            {item.products.map(i => (
                                                <Link key={i.id}
                                                    href={`${i.href}?from=${from}&id=${i.id}`}
                                                    onClick={() => setOpenMenu(false)}
                                                    className={cn(
                                                        "block py-1 px-2 rounded-md whitespace-nowrap hover:bg-gray-100",
                                                        i.href === product.href ? "text-main" : "text-gray-600"
                                                    )}
                                                >
                                                    {i.name}
                                                </Link>
                                            ))}
                                        </div>}
                                </li>
                            ))}
                        </motion.ul>
                    }
                </div>
            }
        </div>
    )
}
