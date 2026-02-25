'use client'

import Image from "next/image"
import { motion } from "framer-motion"

import { ClientsDTO } from "@/types/respDto"

const PARTNERS = [
    { name: 'Partner 1', logo: '/next.svg' }, // 임시로 넥스트 로고 사용
    { name: 'Partner 2', logo: '/next.svg' },
    { name: 'Partner 3', logo: '/next.svg' },
    { name: 'Partner 4', logo: '/next.svg' },
    { name: 'Partner 5', logo: '/next.svg' },
    { name: 'Partner 6', logo: '/next.svg' },
]

export default function LogoTicker({clients}: {clients: ClientsDTO[]}) {
    return (
        <div className="py-6 md:py-8 bg-gray-800 overflow-hidden">
            <div className="hidden md:block container mx-auto px-4 mb-6">
                <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest">
                    Trusted by Innovative Companies
                </p>
            </div>
            {/* 무한 루프 */}
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div className="flex gap-15 md:gap-20 flex-none pr-20"
                    animate={{ x: '-50%' }} // 전체 길이의 절반만큼 이동, FIXME 3번반복이면 33.33%이동인데 하면 멈춤
                    transition={{
                        duration: 50, // 속도 조절 (숫자가 클수록 느려짐)
                        repeat: Infinity,
                        ease: 'linear', // 일정한 속도를 위해 필수
                        repeatType: 'loop'
                    }}
                >
                    {[...clients, ...clients, ...clients].map((partner, idx) => (
                        <div key={idx} className="flex-none h-5 md:h-10 w-auto flex items-center justify-center">
                            <Image src={partner.logo} alt={partner.name} width={60} height={20}
                                className="h-full w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

        </div>
    )
}
