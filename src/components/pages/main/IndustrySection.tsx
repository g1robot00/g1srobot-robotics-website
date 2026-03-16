'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

import Container from '@/components/shared/Container';
import SectionHeader from '../../shared/SectionHeader';
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
                    title={`비즈니스 효율을 높이는\n산업별 공정 솔루션`}
                    href='/solutions'
                />
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 3xl:gap-8'>
                    {industries.map((item, index) => (
                        <Link key={item.id} href={`${item.href}#${item.id}`} className='group'>
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className='relative p-8 3xl:p-12 border border-gray-200 rounded-3xl bg-white hover:border-main hover:shadow-lg transition-colors duration-500 overflow-hidden'
                            >
                                <span className="absolute top-8 right-8 text-gray-100 font-bold text-5xl group-hover:text-main/10 transition-colors">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className='relative z-10'>
                                    <p className="text-main font-bold text-sm mb-2 ">{item.nameEn}</p>
                                    <h3 className='text-2xl 3xl:text-4xl font-bold mb-4'>{item.label}</h3>
                                    
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
