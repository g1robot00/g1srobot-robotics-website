import React from 'react'

import BannerBtn from '@/components/elements/CtaBtn'
import { CTA } from '@/constants/cta'

export default function CtaSection() {
    return (
        <section className='w-full py-60 flex items-center justify-center'>
            <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20
                            flex-1 grid grid-cols-2 gap-4'
            >
                {CTA.map((item, idx) => (
                    <BannerBtn key={`${idx}.${item.label}`}
                                cta={item} />
                ))}
            </div>
        </section>
    )
}
