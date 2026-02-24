import React from 'react'

import Container from '@/components/shared/Container'
import BannerBtn from '@/components/elements/CtaBtn'
import { CTA } from '@/constants/cta'

export default function CtaSection() {
    return (
        <section className='w-full py-60 flex items-center justify-center'>
            <Container className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {CTA.map((item, idx) => (
                        <BannerBtn key={`${idx}.${item.label}`}
                                    cta={item} />
                    ))}
            </Container>
        </section>
    )
}
