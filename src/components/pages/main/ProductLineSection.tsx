'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { SECTION_PY } from '@/constants/styles';
import Container from '@/components/shared/Container';
import SectionHeader from './SectionHeader';
import Badge from '@/components/ui/Badge';
import { ProductLineListDTO } from '@/types/respDto';
import { MoveRight, ArrowUpRight  } from 'lucide-react';

interface ProductLineSectionProps {
    productLines: ProductLineListDTO[];
}

export default function ProductLineSection({productLines}: ProductLineSectionProps) {
    const [activeId, setActiveId] = useState(0); // 현재 활성화된 아이템 인덱스
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 아이템을 참조하기 위한 Ref 배열
    const isManualScrolling = useRef(false);    //수동 스크롤중엔 잠금

    // (추가_nav역할)
    const scrollToSection = (index: number) => {
        const element = itemRefs.current[index];
        if(element) {
            isManualScrolling.current = true;
            //화면 중앙에 오도록 정렬
            setActiveId(index);
            setTimeout(() => {
            // 현재 요소의 절대 위치(Y)를 가져옵니다.
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            
            // 화면 중앙에 맞추기 위한 계산
            // 요소의 맨 위 지점 - (화면 전체 높이 / 2) + (요소 현재 높이 / 2)
            const middleOffset = absoluteElementTop - (window.innerHeight / 2) + (element.clientHeight / 2);

            window.scrollTo({
                top: middleOffset,
                behavior: 'smooth'
            });
        }, 80);

            // 스크롤이 도착할 즈음(약 0.8초 후) 잠금 해제
            setTimeout(() => {
                isManualScrolling.current = false;
            }, 800); // 스크롤 속도에 따라 600~1000ms 사이로 조절하세요.
        }

        
    }

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0% -40% 0%', //화면 중앙에 왔을 때 감지하도록 마진 조절
            threshold: 0,
        }

        const observer = new IntersectionObserver((entries) => {
            if (isManualScrolling.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 화면에 들어온 요소의 data-index 값을 읽어 상태 업데이트
                    const index = Number(entry.target.getAttribute('data-index'));
                    setActiveId(index);
                }
            })
        }, observerOptions);

        // 모든 리스트 아이템 관찰 시작
        itemRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className='relative w-full  py-10 '>
            <div className='absolute inset-0 z-[-2] overflow-hidden'>
                <Image src='/img/productLineBg/bg10.jpg' alt='background' fill className='object-cover scale-105'/>
            </div>
            <Container className={cn(SECTION_PY.lg, 'transition-all duration-500')}>
                <SectionHeader category='Product Lines'
                            title={`정밀한 제어와 성능을 갖춘\n로봇 라인업`}    //현장의 기준이 되는\n자동화 제품군을 소개합니다
                            theme='dark'
                            href='/products'
                />
                    <div className='relative flex flex-col md:flex-row gap-10 md:gap-20 3xl:gap-32 '>
                        {/* 왼쪽: 아코디언 스타일 */}
                        <div className='flex-1 flex flex-col py-0 lg:py-20 '>
                            {productLines.map((item, index) => {
                                const isActive = activeId === index;
                                return(
                                    <div key={item.id}
                                        data-index = {index}
                                        ref={(el) => {itemRefs.current[index] = el;}} //ref 저장
                                        className= {`border-b border-gray-800 py-10 md:py-15 transition-opacity duration-500
                                                    ${activeId === index ? 'opacity-100' : 'opacity-30'}`}
                                    >
                                        <div className={cn('flex items-center justify-between transition-all duration-500', 
                                                        isActive ? 'mb-6' : 'text-gray-600 hover:text-gray-400')}
                                        >
                                            <div className='flex flex-col gap-1 cursor-pointer '>
                                                <h3 onClick={() => scrollToSection(index)}
                                                    className={cn(
                                                        'text-2xl md:text-4xl 3xl:text-6xl font-bold ',
                                                        isActive && 'text-white'
                                                    )}
                                                >
                                                    {item.label}
                                                </h3>
                                                <p className={`text-sm md:text-base ${isActive && 'text-gray-300'}`}>{item.nameEn}</p>
                                            </div>
                                            <Link href={`${item.href}#${item.id}`} 
                                                className={cn('cursor-pointer', isActive ? 'text-white p-3 bg-white/20 rounded-full' : 'hidden')}
                                            >
                                                <ArrowUpRight  className='w-6 h-6 md:w-8 md:h-8'/>
                                            </Link>
                                        </div>
                                        {/* 상세내용 및 모바일 전용 이미지 */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div 
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: 'auto', opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.4, ease: 'circOut'}}
                                                    className='flex flex-col gap-6 overflow-hidden'
                                                >
                                                    <p className='text-gray-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap'>
                                                        {item.content}
                                                    </p>
                                                    {/* 모바일 전용 이미지박스 */}
                                                    <div className='block lg:hidden relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden'>
                                                        {item.thumbnail 
                                                            ?<Image src={item.thumbnail} alt={item.label} fill className='object-cover'/>
                                                            :<div className='w-full h-full bg-gray-700'/> 
                                                        }
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                        {/* 오른쪽: 화면에 고정되는 이미지 박스 */}
                        {/* FIXME 3xl flex-1.5 적용 안되는 듯, md 이상에서 flex-[1.5]를 주어 텍스트보다 더 넓은 영역 차지, 3xl에서 높이 증가 */}
                        <div className='hidden lg:block lg:flex-[1.2] 3xl:flex-[1.5] sticky top-1/5 3xl:top-1/6 h-[600px] 3xl:h-[800px]'> 
                            <AnimatePresence  mode="wait">
                                <motion.div className='relative w-full h-full bg-gray-800 rounded-2xl overflow-hidden'
                                            key={activeId} // activeId가 바뀔때마다 애니메이션 트리거
                                            initial={{opacity: 0, scale: 0.95, y: 20}}
                                            animate={{ opacity: 1, scale: 1, y:0 }}
                                            exit={{opacity: 0, y: -20}}
                                            transition={{duration: 0.2, ease: [0.22, 1, 0.36, 1]}}
                                >
                                    {/* 현재 activeId에 맞는 이미지 출력 */}
                                    {productLines[activeId].thumbnail
                                    ?<Image src={productLines[activeId].thumbnail}
                                            alt={productLines[activeId].label}
                                            fill
                                            className='object-cover bg-gray-700'
                                    />
                                    : <div className='w-full h-full bg-gray-700'></div>
                                    }
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
            </Container>
        </section>
    )
}
