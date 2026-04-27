'use client'

import ScrollReveal from '@/motions/ScrollReveal';

export default function HeroTitle( {title}: {title: string}) {
    return (
        <ScrollReveal>
            <h1 className='text-3xl md:text-5xl 3xl:text-6xl font-bold '>{title}</h1>
        </ScrollReveal>
    )
}
