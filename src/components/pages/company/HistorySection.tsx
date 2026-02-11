import React from 'react'

import SectionHeader from '../main/SectionHeader'

export default function HistorySection() {
    return (
        <section className='w-full'>
            <SectionHeader category='History' 
                        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                        className='py-30 '
            >
                <div className='grid grid-cols-[180px_1fr]'>
                    {/* 연도 네브 */}
                    <div className='flex flex-col gap-5 divide-y divide-gray-200'>
                        <span className='text-xl text-gray-500'>2020~</span>
                        <span className='text-xl text-gray-500'>2010~2019</span>
                        <span className='text-xl text-gray-500'>2000~2009</span>
                        <span className='text-xl text-gray-500'>2020~</span>
                    </div>
                    {/* 연혁 */}
                </div>
            </SectionHeader>
        </section>
    )
}
