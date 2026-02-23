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
        <section className='w-full h-screen flex items-center justify-center'>
            <Container>
                
                <SectionHeader category='Solution'
                            title='산업별 최적의 솔루션을 제안드립니다~~~~~~~~~~~~~~~'
                />
                    <div className='w-full flex flex-wrap gap-2'>
                        {industries.map(item => (
                            <Link href={`${item.href}#${item.id}`} className='block'>
                                <motion.div initial='initial' whileHover='hover'
                                            variants={{
                                                initial: {borderColor: '#9ca3af'},
                                                hover: {borderColor: 'var(--main)'}
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className='group relative p-1 border border-gray-400 rounded-full cursor-pointer overflow-hidden'
                                >
                                    {/* 배경 컬러 */}
                                    <motion.div 
                                        variants={{
                                            initial: {right: '40px', backgroundColor: '#9ca3af'}, //화살표 공간 남김
                                            hover: {right: '4px', backgroundColor: 'var(--main)'}, // 오른쪽 끝까지(p-1남김)
                                        }}
                                        transition = {{type: 'spring', stiffness: 400, damping: 30}}
                                        className='absolute inset-y-1 left-1 bg-gray-400 rounded-full z-0'
                                    />
                                    
                                    {/* 컨텐츠 */}
                                    <div className='relative z-10 flex gap-1 items-center justify-between w-full'>
                                        <div className='px-6 py-2 text-white text-lg font-bold '>
                                            {item.label}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <motion.div variants={{
                                                initial: {color: '#9ca3af'}, 
                                                hover: {color: '#ffffff'}
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            >
                                                <ArrowUpRight className='mr-2'/>
                                                {/* var(--main) */}
                                            </motion.div>
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
