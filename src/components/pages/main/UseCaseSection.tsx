import React from 'react'
import { client } from "@/lib/sanity";

import { USE_CASES_QUERY } from '@/lib/queries'
import SectionHeader from './SectionHeader';
import UseCaseCard from '@/components/elements/card/UseCaseCard'
import { UseCaseDTO } from '@/types/respDto';
import ScrollReveal from '@/motions/ScrollReveal';

export default async function UseCaseSection() {
    const useCases: UseCaseDTO[] = await client.fetch(USE_CASES_QUERY) || [];

    return (
        <section className='w-full'>
            <SectionHeader category='Use Cases'
                            title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            >
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {useCases.length > 0
                        ? useCases.map(item => (
                            <UseCaseCard key={item.title}
                                useCase={item}
                            />
                        ))
                        : (
                            <p>등록된 사례가 없습니다.</p>
                        )
                    }
                </div>
            </SectionHeader>
        </section>
    )
}
