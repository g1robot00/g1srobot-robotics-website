import React from 'react'
import { client } from '@/lib/sanity';

import { CONTACT_QUERY } from '@/lib/queries'
import IconRenderer from '@/components/ui/IconRenderer';
import { ContactDTO } from '@/types/respDto';

export default async function ContactHeader() {
    const rawContact: ContactDTO = await client.fetch(CONTACT_QUERY);
    const contacts = [
    { id: 'email', ...rawContact.email },
    { id: 'phone', ...rawContact.phone },
];

    return (
        <div className='flex flex-col gap-10 items-center justify-center '>
            <h3 className='text-xl md:text-3xl text-center font-bold '>
                궁금한 점을 남겨주시면 빠른 시간 내로 연락드리겠습니다.
            </h3>
            <div className='grid gap-4 grid-cols-1 md:gap-10 md:grid-cols-2 '>
                {contacts.map(item => {
                    const { iconName, value } = item
                    return (
                        <div key={item.id}
                            className='flex gap-4 items-center text-gray-400'
                        >
                            <span className='p-3 border rounded-full'>
                                <IconRenderer iconName={iconName} size={20} strokeWidth={1} />
                            </span>
                            <span>{value}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
