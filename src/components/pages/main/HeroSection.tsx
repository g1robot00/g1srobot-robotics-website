import ScrollReveal from '@/motions/ScrollReveal';
import { MoveRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="w-full h-screen px-5 md:px-10 lg:px-20 bg-black 
                    flex flex-col items-center justify-center
                    text-white text-center"
    >
      <ScrollReveal >
        <div className='flex flex-col items-center'>
          <h1 className="font-bold text-2xl md:text-4xl">Lorem ipsum dolor sit amet do eiusmod</h1>
          <p className="text-sm md:text-base">consectetur adipiscing elit,</p>
          <button className="mt-10 px-8 py-4 bg-white/30 rounded-full
                              flex gap-2 items-center text-xs md:text-sm
                              hover:bg-white hover:text-black cursor-pointer"
          >
            G1sRobot과 함께 상상을 실현해 보세요
            <MoveRight size={14} />
          </button>
        </div>
      </ScrollReveal>
    </div>
  )
}
