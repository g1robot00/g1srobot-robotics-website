import { PortableText } from '@portabletext/react'

import { forwardRef } from 'react'
import { InquiryConsentDTO } from '@/types/respDto'

interface PolicySectionProps {
    isAgreed: boolean
    setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>
    policy: InquiryConsentDTO
}

const PolicySection = forwardRef<HTMLInputElement, PolicySectionProps>(
    ({isAgreed, setIsAgreed, policy}, ref) => {
        return (
        <div className='px-2 pb-10 space-y-5 border-b border-gray-200'>
            <h3 className='text-xl font-bold text-gray-800'>{policy.title}</h3>
            <div className='w-full p-8 bg-gray-300 rounded-lg space-y-4 text-gray-600 '>
                <div className='prose prose-sm max-w-none overflow-y-auto p-2 '>
                        <PortableText value={policy.content}/>
                    </div>
            </div>
            <div className='flex gap-2 items-center'>
                <input type='checkbox'
                    id='privacy'
                    ref={ref}
                    checked={isAgreed}
                    onChange={e => setIsAgreed(e.target.checked)}
                    className='w-5 h-5 cursor-pointer outline-none accent-main transition-color duration-300'
                />
                <label htmlFor='privacy' className='cursor-pointer select-none'>{policy.label}</label>
            </div>
        </div>
    )
    })

PolicySection.displayName = "PolicySection";
export default PolicySection;