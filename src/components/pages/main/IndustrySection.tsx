'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

import Container from '@/components/shared/Container';
import SectionHeader from './SectionHeader';
import IconRenderer from '@/components/ui/IconRenderer';
import { IndustryListDTO } from '@/types/respDto';
import { ArrowUpRight } from 'lucide-react';

interface IndustrySectionProps {
    industries: IndustryListDTO[];
}

export default function IndustrySection({industries}: IndustrySectionProps) {
    return (
        <section className='relative w-full py-20 3xl:py-40 overflow-hidden'>
            {/* ✨ 배경 데코레이션 */}
            <div className="absolute -top-20 -left-10 z-[-2] text-gray-100 font-black text-[15rem] leading-none opacity-40 select-none">
                01
            </div>

            <Container>
                <SectionHeader 
                    category='Solutions'
                    title={`비즈니스 효율을 높이는\n산업별 공정 솔루션`} //다양한 산업 현장에 필요한\n자동화 시스템을 확인하세요
                    href='/solutions'
                />
                {/* ✨ 우측에 전체보기 링크 등을 두어 균형을 맞춤 */}
                {/* <Link href="/solutions" className="flex-shrink-0 text-gray-400 hover:text-main transition-colors font-bold">
                    View All Solutions →
                </Link> */}

                {/* ✨ 그리드 레이아웃으로 변경 */}
                {/* FIXME 3xl 적용안됨 */}
                <div className='grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-3 gap-6 3xl:gap-8'>
                    {industries.map((item, index) => (
                        <Link key={item.id} href={`${item.href}#${item.id}`} className='group'>
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className='relative p-8 3xl:p-12 border border-gray-200 rounded-3xl bg-white hover:border-main transition-colors duration-500 overflow-hidden'
                            >
                                {/* ✨ 배경에 숫자나 약어 (01, 02...) */}
                                <span className="absolute top-8 right-8 text-gray-100 font-bold text-5xl group-hover:text-main/10 transition-colors">
                                    0{index + 1}
                                </span>

                                <div className='relative z-10'>
                                    <p className="text-main font-bold text-sm mb-2 uppercase tracking-widest">Industry</p>
                                    <h3 className='text-2xl 3xl:text-4xl font-bold mb-4'>{item.label}</h3>
                                    {/* FIXME 3xl에서만 내용넣기 */}
                                    {/* <p className="text-gray-500 line-clamp-2 mb-8 3xl:text-lg">
                                        {item.description || "이 산업에 대한 최적화된 자동화 설명이 들어갑니다."}
                                    </p> */}
                                    
                                    <div className="flex items-center gap-2 font-bold group-hover:text-main transition-colors">
                                        <span>자세히 보기</span>
                                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
