'use client'

import {useState, useEffect} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils';
import Container from '@/components/shared/Container';
import { SLOGANS } from '@/constants/slogan';

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // 15초마다 인덱스 변경
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev+1) % SLOGANS.length)
    }, 15000)
    return () => clearInterval(timer);
  }, [index]); //수동으로 인덱스를 바꿀 때 15초 타이머를 리셋하기 위해

  // 드래그 감지
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // 이 픽셀 이상 드래그해야 넘어감
    if(info.offset.x < -swipeThreshold) {
      //왼쪽 드래그 다음 슬라이드
      setIndex(prev => (prev + 1) % SLOGANS.length);
    } else if (info.offset.x > swipeThreshold) {
      setIndex(prev => (prev - 1 + SLOGANS.length) % SLOGANS.length);
    }
  }

  return (
    <section className={cn('relative w-full h-screen bg-gray-900 bg-grain overflow-hidden',
                    'flex flex-col items-center justify-center text-white text-center')}
    >
      <div className='absolute inset-0 z-[-2] overflow-hidden'>
        <Image 
          src={SLOGANS[index].bg} 
          alt={`heroBg ${index}`} 
          fill 
          priority
          className='object-cover scale-105' 
          sizes='100vw'
        />
      </div>
      <div className="absolute inset-0 z-[-1] bg-black/70 " />

      <motion.div drag='x'
                  dragConstraints={{left: 0, right: 0}}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 z-5 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <Container className="h-full flex flex-col items-center justify-center">
            <AnimatePresence mode='wait' >
              <motion.div key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity:1, y: 0 }}
                        exit={{opacity: 0, y: -20}}
                        transition={{ type: "spring", stiffness: 100, damping: 20}}
                        className='flex flex-col gap-3 w-full max-w-4xl'>
                <h1 className="font-bold text-2xl md:text-5xl 3xl:!text-6xl leading-tight select-none">{SLOGANS[index].kr}</h1>
                <p className="text-base md:text-xl 3xl:!text-2xl text-gray-400 tracking-widest select-none">{SLOGANS[index].en}</p>
              </motion.div>
            </AnimatePresence>
        </Container>
      </motion.div>
      {/* 하단 인디케이터 */}
      <div className='absolute bottom-10 z-20 flex transition-height duration-200'>
        {SLOGANS.map((_, i) => (
          <button key={i}
                  onClick={() => setIndex(i)}
                  className='p-1 md:p-2 flex items-center justify-center group cursor-pointer'
          >
            <div className={`h-1 md:h-1.5 transition-all duration-500 rounded-full cursor-pointer ${i === index ? 'w-8 md:w-10 bg-main' : 'w-3 bg-white/20'}`}/>      
          </button>
        ))}
      </div>
    </section>
  )
}
