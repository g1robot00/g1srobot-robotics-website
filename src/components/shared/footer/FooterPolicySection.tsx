'use client'

import {useState} from 'react'
import PolicyModal from '@/components/elements/PolicyModal';
import { FooterDTO } from '@/types/respDto';

interface FooterPolicySectionProps {
    policy: FooterDTO['policy']
}

export default function FooterPolicySection({policy}: FooterPolicySectionProps) {
    type PolicyKey = keyof FooterDTO['policy']; 
    const [openModalKey, setOpenModalKey] = useState<PolicyKey | null>(null);

    return (
        <>
            <div className='flex flex-col gap-2 md:items-end text-xs md:text-base md:text-right'>
                <div className='flex gap-3'>
                    <button onClick={() => setOpenModalKey('emailRefusal')} className='cursor-pointer'>이메일 무단수집 거부</button>
                    <button onClick={() => setOpenModalKey('privacyPolicy')} className='text-main cursor-pointer'>개인정보처리방침</button>
                </div>
                <span className='text-sm text-gray-500'>@Copyright G1sRobot, All Rights Reserved</span>
            </div>
            {openModalKey && <PolicyModal onClose={()=>setOpenModalKey(null)} data={policy[openModalKey]}/>}
        </>
    )
}
