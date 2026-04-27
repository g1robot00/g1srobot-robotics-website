'use client'

import {useRef, useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { SECTION_PY } from '@/constants/styles';
import UseCaseOverlay from '../use-cases/UseCaseOverlay';
import Container from '@/components/shared/Container';
import SectionHeader from '../../shared/SectionHeader';
import UseCaseCard from '@/components/elements/card/UseCaseCard'
import { UseCaseDTO } from '@/types/respDto';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'

interface UseCaseSectionProps {
    useCases: UseCaseDTO[] | [];
}

export default function UseCaseSection({useCases}: UseCaseSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bgImage = '/img/landingHeroBg/heroBg4.jpg';   //FIXME 이미지 교체
    
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedCase = useCases.find(item => item.id === selectedId); // FIXME 없을 경우 알림띄우기

    const handleScroll = (direction: 'left' | 'right') => {
        if(scrollRef.current) {
            const {scrollLeft, clientWidth} = scrollRef.current;
            const scrollAmount = clientWidth * 0.6;

            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className={cn('relative w-full h-screen 3xl:h-fit 3xl:min-h-[80vh]', `${SECTION_PY.base}`, 'flex flex-col justify-center  bg-grain overflow-hidden')}>
            {/* 배경 */}
            {bgImage && (
                <div className='absolute inset-0 z-[-2]'>
                    <Image src={bgImage} alt='useCaseBg' fill className='object-cover scale-110'/>
                </div>
            )}
            <div className="absolute inset-0 z-[-1] bg-black/60 backdrop-blur-sm" />

            {/* 헤더 */}
            <Container>
                <div className='flex justify-between items-end'>
                    <SectionHeader category='Use Cases'
                                    title={`파트너와 함께 달성한\n자동화 성공 경험을 공유합니다`}
                                    className='w-full'
                                    theme='dark'
                    />
                    <div className='hidden md:flex gap-5 items-start mb-20'>
                        <button onClick={() => handleScroll('left')}
                                className='p-2 rounded-full bg-main/30 text-main cursor-pointer'
                        >
                            <ChevronLeft size={30}/>
                        </button>
                        <button onClick={() => handleScroll('right')}
                                className='p-2 rounded-full bg-main/30 text-main cursor-pointer'
                        >
                            <ChevronRight size={30}/>
                        </button>
                    </div>
                </div>
            </Container>

            {/* 카드영역 */}
            <div className={cn('w-full flex-1 3xl:flex-0 min-h-0')}>
                {useCases.length > 0
                    ? <div ref={scrollRef}
                        className={cn('w-full h-fit md:h-full flex gap-5 items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide',
                                    'pl-5 md:pl-10 xl:pl-[calc((100vw-1440px)/2+80px)] 3xl:!pl-[calc((100vw-1840px)/2+80px)]',
                                    'pr-5 md:pr-10 xl:pr-[calc((100vw-1440px)/2+80px)] 3xl:!pr-[calc((100vw-1840px)/2+80px)]'
                                )}
                        // 스냅 위치를 왼쪽(start)으로 고정하여 정렬 유지
                        style={{ scrollSnapType: 'x mandatory', scrollPaddingLeft: 'var(--side-margin, 20px)'  }}
                    >

                        {useCases.map(item => (
                            <div key={item.id}
                                className={cn('flex-shrink-0 snap-start',
                                            // FIXME 데스크탑 너비: % 사용XX
                                            'w-[80vw] md:w-[30%] ')}
                            >
                                <UseCaseCard useCase={item} onCardClick={() => setSelectedId(item.id)}/>
                            </div>
                        ))}
                        <Link href='/use-cases' 
                            className={cn('group ml-5 flex flex-col gap-2 items-center text-white', 'flex-shrink-0 snap-start' )}
                        >
                            <div className='h-fit p-5 border border-gray-200 rounded-full group-hover:bg-gray-300/30 cursor-pointer '>
                                <MoveRight/>
                            </div>
                            <span className="text-sm font-bold opacity-60 group-hover:opacity-100">전체보기</span>
                        </Link>
                        <div className='flex-shrink-0 w-5 md:w-10 xl:w-20 3xl:w-[calc((100vw-1840px)/2+80px)]' />
                    </div>
                    : <Container className='h-full'>
                        <div className='w-full h-full min-h-[400px] 3xl:h-[700px] flex items-center justify-center rounded-lg bg-white/20'>
                            <p className='font-bold text-gray-400'>
                                공개사례 준비중입니다.
                            </p>
                        </div>
                    </Container>
                }
            </div>
            {selectedCase && 
                <UseCaseOverlay 
                    useCase={selectedCase}
                    onClose={() => setSelectedId(null)}
                />
            }
        </section>
    )
}
