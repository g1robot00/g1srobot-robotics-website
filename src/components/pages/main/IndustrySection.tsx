import React from 'react'
import { client } from '@/lib/sanity';

import SectionHeader from './SectionHeader';
import IconBtn from '@/components/elements/IconBtn';
import { IndustryListDTO } from '@/types/respDto';

interface IndustrySectionProps {
    industries: IndustryListDTO[];
}

export default async function IndustrySection({industries}: IndustrySectionProps) {
    return (
        <section className='w-full h-screen flex items-center justify-center'>
            
            <SectionHeader category='Solution' 
                        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            >
                    <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-15'>
                        {industries.map(item => (
                                <IconBtn key={item.label}
                                    label={item.label}
                                    icon={item.icon}
                                    href={item.slug}
                                />
                        ))}
                    </div>
            </ SectionHeader>
        </section>
    )
}
