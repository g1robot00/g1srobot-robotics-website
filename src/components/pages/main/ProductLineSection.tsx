'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { SECTION_PY } from '@/constants/styles';
import ProductLineCategory from './ProductLineCategory';
import ProductLineGallery from './ProductLineGallery';
import Container from '@/components/shared/Container';
import SectionHeader from './SectionHeader';
import { ProductLineListDTO } from '@/types/respDto';

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
                            <ProductLineCategory 
                                productLines={productLines}
                                activeId={activeId}
                                onItemClick={scrollToSection}
                                itemRefs={itemRefs}
                            />
                        </div>

                        {/* 오른쪽: 화면에 고정되는 이미지 박스 */}
                        <div className={cn('hidden lg:block', 
                                        'lg:flex-[1.2] 3xl:!flex-[1.5]', 
                                        'sticky top-[calc(50vh-300px)] 3xl:top-[calc(50vh-375px)] aspect-square min-h-[400px] max-h-[600px] 3xl:max-h-[750px]')}
                        > 
                            <ProductLineGallery 
                                previews={productLines.map(item => ({
                                        thumbnail:item.thumbnail, 
                                        label: item.label
                                    }))} 
                                activeId={activeId}
                            />
                        </div>
                    </div>
            </Container>
        </section>
    )
}
