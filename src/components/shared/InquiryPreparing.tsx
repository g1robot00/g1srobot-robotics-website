import React from 'react'

import { ContactDTO } from '@/types/respDto'
import { LoaderCircle } from 'lucide-react'

interface InquiryPreparingProps {
    initialContact: ContactDTO | null
}

export default function InquiryPreparing({initialContact}: InquiryPreparingProps) {
    if (!initialContact) return null;

    const contacts = [
        {nameEn: 'Tel.', value: initialContact.phone},
        {nameEn: 'Email.', value: initialContact.email},
    ];
    
    return (
        <div className=' h-[60vh] flex items-center justify-center p-5'>
            <div className='flex flex-col gap-10 items-center'>
                <div className='flex flex-col gap-5 items-start md:items-center'>
                    <LoaderCircle size={40} className='text-main'/>
                    <div className='flex flex-col gap-2 items-start md:items-center'>
                        <span className='font-bold text-3xl md:text-5xl tracking-tighter'>서비스 준비중입니다.</span>
                        <p className='md:text-center text-gray-700 text-base md:text-lg font-medium break-keep'>
                            아래 연락처로 문의주시면 빠른 시간내로 연락드리겠습니다.
                        </p>
                    </div>
                </div>

                <div className='w-full p-8 md:p-12 bg-white border border-gray-100 rounded-xl shadow-xl  flex flex-col gap-y-3'>
                    {contacts.map(item => (
                        <div key={item.nameEn} className='grid grid-cols-1 md:grid-cols-[120px_1fr] gap-1 md:gap-3 text-left '>
                            <span className='font-bold'>
                                {item.nameEn}
                            </span>
                            <span className='text-lg text-gray-800 tracing-tight '>{item.value.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
