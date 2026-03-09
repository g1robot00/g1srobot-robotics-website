'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { SECTION_PY } from '@/constants/styles';
import Container from '@/components/shared/Container';
import SectionHeader from './SectionHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { ProductLineListDTO } from '@/types/respDto';
import { ChevronRight, CircleAlert  } from 'lucide-react';

interface ProductLineSectionProps {
    productLines: ProductLineListDTO[];
}

export default function ProductLineSection({productLines}: ProductLineSectionProps) {
    console.log(productLines[0])
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
        <section className='relative w-full  py-10'>
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
                                        className= {cn('border-b border-gray-800 transition-opacity duration-500',
                                                    isActive? 'border-main opacity-100' : 'opacity-30 hover:opacity-100')}
                                    >
                                        <Link href={item.hasProducts ? `${item.href}#${item.id}`: '/support'} 
                                            onClick={(e) =>  {
                                                if (!isActive) {
                                                    e.preventDefault(); 
                                                    scrollToSection(index);
                                                }
                                            }}
                                            className='block group p-3  py-7 md:py-12'
                                        >
                                            <div className={cn('flex flex-col gap-2 md:flex-row  md:items-center md:justify-between transition-all duration-500',
                                                            isActive ? 'mb-10' : 'text-gray-600 hover:text-gray-400')}
                                            >
                                                <div className='flex flex-col gap-2'>
                                                    <p className={`text-sm md:text-base font-bold ${isActive && 'text-main'}`}>{item.nameEn}</p>
                                                    <h3 className={cn('text-2xl md:text-4xl  font-bold tracking-tight',
                                                                    isActive && 'text-white')}
                                                    >
                                                        {item.label}
                                                    </h3>
                                                </div>
                                                
                                            </div>
                                            {/* 상세내용 및 모바일 전용 이미지 */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{height: 0, opacity: 0}}
                                                        animate={{height: 'auto', opacity: 1}}
                                                        exit={{height: 0, opacity: 0}}
                                                        transition={{duration: 0.4, ease: 'circOut'}}
                                                        className='flex flex-col gap-6 '
                                                    >
                                                        <p className='text-gray-300 text-base tracking-wide leading-relaxed whitespace-pre-wrap'>
                                                            {item.content}
                                                        </p>

                                                        <div className='relative flex flex-col w-fit'>
                                                            <div
                                                                className={cn(
                                                                        'flex items-center gap-2 transition-all duration-300',
                                                                        item.hasProducts ? 'text-white group-hover:text-main': 'text-white group-hover:text-amber-400',
                                                                        )}
                                                            >
                                                                <span className='text-sm md:text-sm font-bold whitespace-nowrap'>
                                                                    {item.hasProducts? 'View more' : 'Go to Inquiry'}
                                                                </span>
                                                                
                                                                <ChevronRight className='w-4 h-4 md:w-5 md:h-5 stroke-[2px]'/>
                                                            </div>
                                                            {!item.hasProducts && 
                                                                <span className='md:hidden flex gap-1 text-[10px] text-gray-500'>
                                                                    <CircleAlert size={12}/>
                                                                    제품 준비 중입니다. 문의주시면 상세히 안내해 드리겠습니다.
                                                                </span>
                                                            }
                                                            {!item.hasProducts &&(
                                                                <div className={cn("absolute top-full mt-1.5 z-10", 
                                                                                    "opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0 transition-all duration-300",
                                                                                    "pointer-events-none whitespace-nowrap")}
                                                                >
                                                                    <div className={cn("relative bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md shadow-xl",
                                                                                        'flex items-center gap-1'
                                                                                    )}>
                                                                        <CircleAlert size={14}/>
                                                                        제품 준비 중입니다. 문의주시면 상세히 안내해 드리겠습니다.
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* 모바일 전용 이미지박스 */}
                                                        <div className='block lg:hidden relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden'>
                                                            {item.thumbnail
                                                                ?<Image src={item.thumbnail} alt={item.label} fill className='object-cover'/>
                                                                : <ImagePlaceholder />
                                                                // <div className='w-full h-full bg-gray-700'/>
                                                            }
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        {/* 오른쪽: 화면에 고정되는 이미지 박스 */}
                        {/* FIXME 3xl flex-1.5 적용 안되는 듯, md 이상에서 flex-[1.5]를 주어 텍스트보다 더 넓은 영역 차지, 3xl에서 높이 증가 */}
                        <div className={cn('hidden lg:block', 
                                        'lg:flex-[1.2] 3xl:flex-[1.5]', 
                                        'sticky top-[calc(50vh-300px)] 3xl:top-[calc(50vh-375px)] aspect-square min-h-[400px] max-h-[600px] 3xl:max-h-[750px]')}
                        > 
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
                                    : <ImagePlaceholder size='lg'/>
                                    }
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
            </Container>
        </section>
    )
}
