import React from 'react'
import { client } from '@/lib/sanity';

import SectionHeader from './SectionHeader';
import IconBtn from '@/components/elements/IconBtn';
import IconRenderer from '@/components/ui/IconRenderer';
import { IndustryListDTO } from '@/types/respDto';
import { MoveRight } from 'lucide-react';

interface IndustrySectionProps {
    industries: IndustryListDTO[];
}

export default async function IndustrySection({industries}: IndustrySectionProps) {
    return (
        <section className='w-full h-screen flex items-center justify-center'>
            
            <SectionHeader category='Solution' 
                        title='산업별 최적의 솔루션을 제안드립니다
                        ~~~~~~~~~~~~~~~'
            >
                <div className='w-full grid grid-cols-2 md:grid-cols-2 gap-10 mt-10 text-gray-700'>
                    {industries.map(item => (
                        <div className='flex justify-between border-b border-gray-400 p-4 cursor-pointer'>
                            <span className='text-lg'>{item.label}</span>
                            <MoveRight />
                        </div>
                            // <IconBtn key={item.label}
                            //     label={item.label}
                            //     icon={item.icon}
                            //     href={item.slug}
                            // />
                    ))}
                </div>
            </ SectionHeader>
        </section>
    )
}
