import React from 'react'

import { CONTACT_LIST } from '@/constants/contact'

export default function ContactHeader() {
    const contacts = [CONTACT_LIST.MAIL, CONTACT_LIST.PHONE];
    return (
        <div className='flex flex-col gap-10 items-center justify-center '>
            <h3 className='text-xl md:text-3xl text-center font-bold '>
                궁금한 점을 남겨주시면 빠른 시간 내로 연락드리겠습니다.
            </h3>
            <div className='grid gap-4 grid-cols-1 md:gap-10 md:grid-cols-2 '>
                {contacts.map(item => {
                    const { icon: Icon, value } = item
                    return (
                        <div key={item.id}
                            className='flex gap-4 items-center text-gray-400'
                        >
                            <span className='p-3 border rounded-full'>
                                <Icon size={20} strokeWidth={1} />
                            </span>
                            <span>{value}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
