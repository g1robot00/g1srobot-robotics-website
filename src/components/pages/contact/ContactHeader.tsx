import React from 'react'

import { CONTACT_QUERY } from '@/lib/queries'
import IconRenderer from '@/components/ui/IconRenderer'
import { ContactDTO } from '@/types/respDto'

interface ContactHeaderProps {
    initialContact: ContactDTO;
}

export default async function ContactHeader({initialContact}: ContactHeaderProps) {
    const contacts = [
        { id: 'email', ...initialContact.email },
        { id: 'phone', ...initialContact.phone },
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
