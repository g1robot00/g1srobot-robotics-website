'use client'

import { usePathname } from 'next/navigation'

import PageNav from './PageNav';
import { NAV_ITEMS } from '@/constants/navigation'
import ScrollReveal from '@/motions/ScrollReveal';

export default function HeroTitle() {
    const pathname = usePathname(); // 현재경로

    // 현재 경로에 맞는 아이템 찾기 (대분류/소분류 통합 검색)
    const allItems = NAV_ITEMS.flatMap(item => item.items ? [item, ...item.items] : [item]);
    const currentItem = allItems.find(item => item.href === pathname);

    // 기본 이미지 설정
    const label = currentItem?.label || "G1 Robotics";
    const bgImage = currentItem?.heroBg || '@/img/default.jpg';

    return (
        <section
            className="relative w-full h-full flex flex-col items-center justify-center text-white bg-cover bg-center"
            style={{
                // 이미지 위에 50% 불투명도의 검은색 막 씌우기
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`
            }}
        >
            <div className='w-full h-full flex flex-col justify-center items-center text-white'>
                <ScrollReveal>
                    <h1 className='text-3xl md:text-5xl font-bold '>{currentItem?.label}</h1>
                </ScrollReveal>
                <PageNav />
            </div>
        </section>
    )
}
