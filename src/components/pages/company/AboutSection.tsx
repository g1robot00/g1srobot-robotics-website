'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

import Badge from '@/components/ui/Badge'
import { SloganItem } from '@/types/respDto'

interface AboutSectionProps {
  slogan: SloganItem
  about: string
  business: string[]
  vision: string
  // list: {
  //   readonly label: string
  //   readonly id: string
  // }[]
}

export default function AboutSection({slogan, about, business, vision}: AboutSectionProps) {
  const aboutMotion = 'absolute inset-0 z-20 w-full h-full flex flex-col gap-8 items-start md:items-center justify-center text-left md:text-center px-10'
  const aboutTitle = 'mt-6 text-2xl md:text-4xl text-main font-bold tracking-wide'
  const aboutContent = 'text-sm md:text-2xl text-white tracking-tight md:whitespace-pre-wrap'
  const containerRef = useRef<HTMLDivElement>(null);
  // 📍 1. Image 컴포넌트를 모션용으로 변환합니다.
  const MotionImage = motion.create(Image);

  // 1. 스크롤 진행도 측정 (0~1)
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. 스크롤 값에 따른 스타일 변화 설계 (시작: 0, 끝: 1)
  // 위치 이동 모션: 80px 내려가 있다가 0으로 올라옴
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  // 너비 70 -> 100
  const width = useTransform(scrollYProgress, [0, 0.3], ['70%', '100%']);
  // 높이 aspect X, vh로 제어
  const height = useTransform(scrollYProgress, [0, 0.3], ['45%', '100vh']);
  // 곡률 24px -> 0
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], ['24px', '0px']);
  
  // top조정으로 밑으로 간 이미지 올리기
  const imagePosition = useTransform(scrollYProgress, [0, 0.3], ['center 70%', 'center 60%']);
  // 오버레이 어두워짐 0 -> 0.6
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 0.8]);
  
  // 첫번째 글씨 투명도: 사라짐
  const firstTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // 두번째 글씨 투명도: 나타남
  const secondTextOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0]);
  // 세번째 글씨 나타남
  const thirdTextOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className='relateve h-[400vh] py-20 w-full bg-black text-white'>
        {/* Sticky: 스크롤 되는동안 화면에 고정되는 영역 */}
        <div className='sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden'>
          {/* 사라질 텍스트 */}
          <motion.div style={{opacity: firstTextOpacity}}
                      className='absolute top-[100px] z-[20] text-center'
          >
            {/* FIXME 뛰어쓰기 반영안됨_whitespace-pre-wrap */}
            <h2 className="mb-2 font-bold text-2xl md:text-5xl leading-tight whitespace-pre-wrap">{slogan.kr}</h2>  
            <p className="text-xs md:text-xl opacity-60 tracking-widest">{slogan.en}</p>
          </motion.div>
          {/* 메인 이미지박스 */}
          <motion.div style={{width, height, borderRadius, y}}
                      className='relative rounded-3xl overflow-hidden'
          >
            <MotionImage src='/img/vision.jpg' 
                  alt='vision image' 
                  fill 
                  priority 
                  style={{objectPosition: imagePosition }}
                  className='object-cover object-[center_70%] scale-110' 
            />
            
            {/* 검정 오버레이 레이어 */}
            <motion.div style={{opacity: overlayOpacity}}
                        className='absolute inset-0 bg-black z-10'
            />

            {/* 새로운 글씨 (이미지안에 나타남) */}
            <motion.div style= {{opacity: secondTextOpacity}}
                        className='absolute inset-0 z-20 w-full h-full flex flex-col gap-8 items-start md:items-center justify-center text-left md:text-center px-10'
            >
              <h2 className={aboutTitle}>
                About
              </h2>
              <p className={aboutContent}>
                {about}
              </p>
              <div className='w-2/3 flex gap-2 justify-start md:justify-center flex-wrap'>
                {business.map(item => (
                  <Badge key={item} label={item} variant='outline' className='text-xs md:text-lg px-4 py-2 bg-white/20'/>
                ))}
              </div>
            </motion.div>

            <motion.div style= {{opacity: thirdTextOpacity }}
                        className={aboutMotion}
            >
              <h2 className={aboutTitle}>
                Vision
              </h2>
              <h2 className={aboutContent}>
                {vision}
              </h2>
            </motion.div>
          </motion.div>
        </div>
    </section>
  )
}
