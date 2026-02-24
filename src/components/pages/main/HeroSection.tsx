'use client'

import {useState, useEffect} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'

import Container from '@/components/shared/Container';
import { SLOGANS } from '@/constants/slogan';
import { MoveRight } from 'lucide-react';



export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // 15초마다 인덱스 변경
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev+1) % SLOGANS.length)
    }, 15000)
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative w-full h-screen bg-gray-900 bg-grain overflow-hidden 
                    flex flex-col items-center justify-center
                    text-white text-center`}
    >
      <div className='absolute inset-0 z-[-2] overflow-hidden'>
        <Image src={SLOGANS[index].bg} alt={`heroBg ${index}`} fill className='object-cover scale-105 '/>
      </div>
      <div className="absolute inset-0 z-[-1] bg-black/70 " />
      <Container>
        <div className='flex flex-col items-center'>
          <AnimatePresence mode='wait' >
            <motion.div key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity:1, y: 0 }}
                      exit={{opacity: 0, y: -20}}
                      transition={{ type: "spring", stiffness: 100, damping: 20}}
                      className='flex flex-col gap-3'>
              {/* FIXME 3xl 글자크기 변경안됨 - !지우기 */}
              <h1 className="font-bold text-2xl md:text-4xl 3xl:!text-6xl leading-tight">{SLOGANS[index].kr}</h1> 
              <p className="text-base md:text-lg 3xl:!text-2xl text-gray-400 tracking-widest">{SLOGANS[index].en}</p>
            </motion.div>
          </AnimatePresence>
          {/* 하단 인디케이터 */}
          <div className='absolute bottom-10 flex gap-2'>
            {SLOGANS.map((_, i) => (
              <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-main' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
