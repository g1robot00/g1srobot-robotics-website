import React from 'react'

import BannerBtn from '@/components/elements/CtaBtn'
import { CTA } from '@/constants/cta'

export default function CtaSection() {
    return (
        <section className='w-full h-screen flex items-center justify-center'>
            <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20
                            flex-1 flex flex-col gap-5'
            >
                {CTA.map((item, idx) => (
                    <BannerBtn key={`${idx}.${item.label}`}
                                cta={item} />
                ))}
            </div>
        </section>
    )
}
