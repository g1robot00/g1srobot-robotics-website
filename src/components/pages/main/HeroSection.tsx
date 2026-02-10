'use client'

import {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion'

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
    <section className={`relative w-full h-screen px-5 md:px-10 lg:px-20 bg-gray-900 bg-grain overflow-hidden 
                    flex flex-col items-center justify-center
                    text-white text-center`}
    >
        <div className='flex flex-col items-center'>
          <AnimatePresence mode='wait' >
            <motion.div key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity:1, y: 0 }}
                      exit={{opacity: 0, y: -20}}
                      transition={{ type: "spring", stiffness: 100, damping: 20}}
                      className='flex flex-col gap-3'>
              <h1 className="font-bold text-2xl md:text-4xl leading-tight">{SLOGANS[index].kr}</h1>
              <p className="text-base md:text-lg text-gray-400 tracking-widest">{SLOGANS[index].en}</p>
            </motion.div>
          </AnimatePresence>

          {/* <button className="mt-10 px-8 py-4 bg-white/30 rounded-full
                              flex gap-2 items-center text-xs md:text-sm
                              hover:bg-white hover:text-black cursor-pointer"
          >
            G1sRobot과 함께 상상을 실현해 보세요
            <MoveRight size={14} />
          </button> */}
          {/* 하단 인디케이터 */}
          <div className='absolute bottom-10 flex gap-2'>
            {SLOGANS.map((_, i) => (
              <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-main' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>
    </section>
  )
}
