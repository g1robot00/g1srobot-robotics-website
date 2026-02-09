'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import SectionHeader from './SectionHeader';
import { ProductLineListDTO } from '@/types/respDto';
import { MoveRight } from 'lucide-react';

interface ProductLineSectionProps {
    productLines: ProductLineListDTO[];
}

export default function ProductLineSection({productLines}: ProductLineSectionProps) {
    const [activeId, setActiveId] = useState(0); // 현재 활성화된 아이템 인덱스
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 아이템을 참조하기 위한 Ref 배열

    console.log('출력이미지: ', productLines[activeId].thumbnail)

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0% -40% 0%', //화면 중앙에 왔을 때 감지하도록 마진 조절
            threshold: 0,
        }

        const observer = new IntersectionObserver((entries) => {
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
        <section className='w-full bg-black'>
            <SectionHeader category='Product Lines' 
                        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                        theme='dark'
                        className='py-55'
            >
                <div className='relative flex gap-20'>
                    {/* 왼쪽: 스크롤되는 텍스트 리스트 */}
                    <div className='flex-1 flex flex-col gap-30 md:gap-80 xl:gap-100 transition-opacity duration-500 py-10 md:pt-20 md:pb-40'>
                        {productLines.map((item, index) => (
                            <div key={`${index}_${item.content}`}
                                data-index = {index}
                                ref={(el) => (itemRefs.current[index] = el)} //ref 저장
                                className= {`flex flex-col gap-15 transition-opacity duration-500
                                            ${activeId === index ? 'opacity-100' : 'opacity-30'}`}
                            >
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-2xl md:text-4xl text-white font-bold'>{item.label}</h3>
                                    <p className='text-gray-400 text-lg leading-relaxed'>{item.content}</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {item.kind.slice(0, 4).map((sub, i) => (
                                            <Link href={sub.href} key={`${i}_${sub}`} className='px-4 py-1.5 bg-main/20 rounded-full text-sm text-main text-md'>
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <Link href={`${item.href}#${item.id}`} className='flex items-center gap-2 text-main font-semibold cursor-pointer group'>
                                    더 알아보기
                                    <MoveRight size={18} className='group-hover:translate-x-1/2 transition-transform'/>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {/* 오른쪽: 화면에 고정되는 이미지 박스 */}
                    <div className='hidden md:block flex-1 sticky top-1/4 h-[500px]'>
                        <div className='relative w-full h-full bg-gray-800 rounded-xl overflow-hidden'>
                            {/* 현재 activeId에 맞는 이미지 출력 */}
                            <Image src={productLines[activeId].thumbnail}
                                    alt={productLines[activeId].label}
                                    fill
                                    className='object-cover transition-all duration-700 ease-in-out'
                            />
                        </div>
                    </div>
                </div>
            </SectionHeader>
        </section>
    )
}
