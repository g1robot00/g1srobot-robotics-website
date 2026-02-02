import React from 'react'
import { client } from '@/lib/sanity';

import { INDUSTRY_LIST_QUERY } from '@/lib/queries';
import IconBtn from '@/components/elements/IconBtn';
import { IndustryListDTO } from '@/types/respDto';

export default async function IndustrySection() {
    const industries: IndustryListDTO[] = await client.fetch(INDUSTRY_LIST_QUERY) || [];

    return (
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
            <h3 className='text-main'>Solution</h3>
            <h2 className='text-4xl font-bold'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h2>
            <div className='w-full grid grid-cols-3 md:grid-cols-4 gap-3 mt-15'>
                {industries.map(item => (
                        <IconBtn key={item.label}
                            label={item.label}
                            icon={item.icon}
                            href={item.slug}
                        />
                ))}
            </div>
        </div>
    )
}
