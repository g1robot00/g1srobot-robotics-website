'use client'

import {useRef} from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import Container from '@/components/shared/Container';
import SectionHeader from './SectionHeader';
import UseCaseCard from '@/components/elements/card/UseCaseCard'
import { UseCaseDTO } from '@/types/respDto';
import ScrollReveal from '@/motions/ScrollReveal';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'

interface UseCaseSectionProps {
    useCases: UseCaseDTO[] | [];
}

export default function UseCaseSection({useCases}: UseCaseSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bgImage = useCases[0]?.thumbnail || '/img/default.jpg';

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
        <section className='relative w-full h-screen 3xl:h-fit 3xl:py-50 flex flex-col gap-5 items-center  bg-grain overflow-hidden'>
            {/* 배경 */}
            {bgImage && (
                <div className='absolute inset-0 z-[-2]'>
                    <Image src={bgImage} alt='useCaseBg' fill className='object-cover scale-110'/>
                </div>
            )}
            <div className="absolute inset-0 z-[-1] bg-black/60 backdrop-blur-xl" />
            <Container className='h-screen 3xl:h-fit py-30 flex flex-col'>
                {/* 헤더 */}
                <div className='flex justify-between items-end'>
                    <SectionHeader category='Use Cases'
                                    title={`파트너와 함께 달성한\n자동화 성공 경험을 공유합니다`}   //로봇 도입으로 변화한\n실제 현장의 공정 사례
                                    className='w-full max-w-full'
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
                {/* 카드영역 */}
                <div className='w-full flex-1 flex gap-20'>
                        {useCases.length > 0
                            ? <div ref={scrollRef}
                                className={cn('flex-1 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-5',
                                            'pl-[5%]  md:pl-[calc((100vw-1280px)/2+40px)] pr-10')}
                            >
                                {useCases.map(item => (
                                    <div key={item.title}
                                        className={cn(
                                                    'flex-shrink-0 snap-center',
                                                    // 모바일: 화면 너비의 85% (다음 카드가 살짝 보여야 스크롤 유도가 됨)
                                                    // 데스크탑(md): 3개가 딱 맞게 보이기 위해 (100% / 3) - 여백(gap) 계산
                                                    'w-[85%] md:w-[calc((100%-40px)/3.8)]'
                                                )}
                                    >
                                        <UseCaseCard useCase={item} />
                                    </div>
                                ))}
                            </div>
                            : <div className='flex-1 w-full min-h-[380px] 3xl:h-[700px] flex items-center justify-center rounded-lg bg-white/20'>
                                <p className='font-bold text-gray-400'>
                                    공개사례 준비중입니다.
                                </p>
                            </div>
                        }
                        <Link href='/use-cases' className='flex flex-col  text-white h-fit p-5 border border-gray-200 rounded-full hover:bg-gray-300/30 cursor-pointer '>
                            <MoveRight />
                        </Link>
                </div>
            </Container>
        </section>
    )
}
