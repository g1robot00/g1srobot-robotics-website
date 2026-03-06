'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import Container from '@/components/shared/Container'
import { CTA } from '@/constants/cta'
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
    return (
        <section className='w-full py-32 md:py-48 3xl:py-60 bg-gray-50/50 relative overflow-hidden'>
            {/* ✨ 배경 데코레이션: 허전함을 달래주는 은은한 원형 그라데이션 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-main/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <Container className='relative z-10 flex flex-col items-center gap-16'>
                {/* ✨ 섹션 헤더: 버튼만 있는 것보다 강력한 문구가 필요합니다. */}
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-bold tracking-tight text-gray-900 break-keep">
                        지금 바로 비즈니스 자동화를<br className="hidden md:block" /> 경험해 보세요
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl">
                        전문 엔지니어가 최적의 솔루션을 제안해 드립니다.
                    </p>
                </div>

                {/* ✨ 버튼 그리드: 카드 배너 스타일 */}
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl'>
                    {CTA.map((item, idx) => (
                        <motion.div
                            key={`${idx}.${item.label}`}
                            whileHover={{ y: -10 }} // ✨ 호버 시 살짝 떠오르는 효과
                            className="group relative"
                        >
                            <Link href={item.href} className="block h-full">
                                <div className={cn(
                                    "h-full p-8 md:p-12 rounded-[2rem] border transition-all duration-500",
                                    // 첫 번째 버튼은 강조(Dark), 두 번째는 일반(White) 스타일 추천
                                    idx === 0
                                        ? "bg-zinc-900 border-zinc-800 text-white hover:shadow-2xl hover:shadow-main/70"
                                        : "bg-white border-gray-200 text-gray-900 hover:shadow-2xl hover:shadow-main/50"
                                )}>
                                    <div className="flex flex-col h-full justify-between gap-12">
                                        <div className="space-y-4">
                                            <span className={cn(
                                                "inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider",
                                                idx === 0 ? "bg-main/20 text-main" : "bg-gray-100 text-gray-500"
                                            )}>
                                                {item.category ||"Next Step"}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                                {item.label}
                                            </h3>
                                            <p className={cn(
                                                "text-base opacity-70",
                                                idx === 0 ? "text-zinc-400" : "text-gray-500"
                                            )}>
                                                { item.description || "상세 내용을 확인하고 맞춤형 솔루션을 찾아보세요."}
                                            </p>
                                        </div>

                                        {/* ✨ 하단 아이콘 섹션 */}
                                        <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all uppercase text-sm tracking-widest">
                                            <span>바로가기</span>
                                            <ArrowRight size={20} className={idx === 0 ? "text-main" : "text-gray-900"} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
