import React from 'react'
import { client } from '@/lib/sanity';

import { INDUSTRY_LIST_QUERY } from '@/lib/queries';
import SectionHeader from './SectionHeader';
import IconBtn from '@/components/elements/IconBtn';
import { IndustryListDTO } from '@/types/respDto';

export default async function IndustrySection() {
    const industries: IndustryListDTO[] = await client.fetch(INDUSTRY_LIST_QUERY) || [];

    return (
        <section className='w-full'>
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
