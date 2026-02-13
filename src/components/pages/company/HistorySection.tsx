'use client'

import { useMemo, useState, useEffect } from 'react'

import { cn } from '@/lib/utils'
import SectionHeader from '../main/SectionHeader'
import { CompanyDTO } from '@/types/respDto'
import { Circle } from 'lucide-react';

interface HistorySectionProps {
    history: CompanyDTO['history'] 
}

export default function HistorySection({history}: HistorySectionProps) {
    // 1. nav 목록
    const yearNav = useMemo(() => {
        if (!history || history.length === 0) return [];

        // 데이터에서 모든 연도를 추출하여 숫자로 변환
        const years = history.map(item => parseInt(item.year));

        // 10년 단위로 묶어서 고유한 '시작연도'리스트 생성
        const decades = years.map(year => {
            if(year <= 2000) return 2000;
            return Math.floor(year/10) * 10; //2015-> 2010, 2024-> 2020
        });

        //중복제거 후 내림차순 정렬
        const uniqueDecades = Array.from(new Set(decades)).sort((a, b) => b-a);

        // UI표시할 문자열로 변환
        return uniqueDecades.map(startYear => {
            if (startYear === 2000) return "2000's";
            return `${startYear}'s`
        })
    },[history])
    
    // 2. 연대별로 그룹화된 리스트
    const groupedHistory = useMemo(() => {
        const groups: { [key: string]: CompanyDTO['history']} = {};
        
        history.forEach(item => {
            const year = parseInt(item.year);
            const decade = year <= 2000 ? "2000's": `${Math.floor(year/10) * 10}'s`;
            if (!groups[decade]) groups[decade] = [];
            groups[decade].push(item);
        });

        return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0])); //최신 연대순 정리
    }, [history]);
    console.log('연대별로 그룹화된 리스트: ', groupedHistory)

    
    const [activeDecade, setActiveDecade] = useState(yearNav[0]);

    // 3. 스크롤 감지(Scroll Spy)
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0% -70% 0%',
            threshold: 0,
        };

        const observer = new IntersectionObserver( enteries => {
            enteries.forEach(entry => {
                if(entry.isIntersecting) {
                    setActiveDecade(entry.target.id);
                }
            });
        }, observerOptions);

        yearNav.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [yearNav]);

    // 4. 클릭시 이동함수
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div className='w-full'>
            <SectionHeader category='History' 
                        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                        className='py-30 flex flex-col md:gap-5'
            >
                <div className='relative flex flex-col gap-15 md:grid md:grid-cols-[180px_1fr] md:gap-35'>
                    {/* 좌측 네비게이션 */}
                    <div className='md:sticky z-10 md:top-30 md:h-fit'>
                        <div className='flex gap-5 md:flex-col justify-center '>
                            {yearNav.map((item, idx) => (
                                <button key={`${idx}_${item}`}
                                        onClick={() => scrollToSection(item)}
                                        className={cn(
                                            'px-2 py-4 md:pl-4 border-b-2 md:border-b-transparent md:border-l-2 text-lg text-left transition-all cursor-pointer', 
                                            activeDecade === item 
                                            ? 'font-bold text-main border-main '
                                            : 'text-gray-400 border-transparent hover:text-gray-600 ')}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* 연혁 */}
                    <div className='flex flex-col gap-32 border-l-2 border-gray-400'>
                        {/* 각 연대(Decade)를 하나의 section으로 묶고 ID를 부여합니다. */}
                        {groupedHistory.map(([decade, items]) => (
                            <section key={decade} id={decade} className='scroll-mt-40'>
                                {items.map(yearItem => (
                                    <div key={yearItem.id} className='relative pl-12 pb-20 last:pb-0'>
                                        {/* 타임라인 포인트 */}
                                        <div className='absolute left-0 -translate-x-1/2'>
                                            <Circle size={16} className='fill-white text-main'/>
                                        </div>
                                        <div className='flex flex-col gap-8'>
                                            <h3 className='text-3xl md:text-4xl text-main/90 font-bold tracking-tight'>
                                                {yearItem.year}
                                            </h3>
                                            <ul className='flex flex-col gap-4'>
                                                {yearItem.events.map((event: any, idx: number) => (
                                                    <li key={`${idx}_${event}`}>
                                                        <span className='text-gray-700 text-lg md:text-xl  leading-snug  tracking-tight md:tracing-normal'>
                                                            {event.content}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
            </SectionHeader>
        </div>
    )
}
