import { forwardRef } from 'react'
import { PRIVACY_POLICY } from '@/constants/policy'

interface PolicySectionProps {
    isAgreed: boolean
    setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>
}

const PolicySection = forwardRef<HTMLInputElement, PolicySectionProps>(
    ({isAgreed, setIsAgreed}, ref) => {
        return (
        <div className='px-2 pb-10 space-y-5 border-b border-gray-200'>
            <h3 className='text-xl font-bold text-gray-800'>개인정보 수집 및 이용 동의</h3>
            <div className='w-full p-8 bg-gray-200 rounded-lg space-y-4 text-gray-600 '>
                <p>{PRIVACY_POLICY.SUMMARY}</p>
                {PRIVACY_POLICY.DETAILS.map(item => (
                    <div key={item.id}>
                        <p>- {item.title}</p>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
            <div className='flex gap-2 items-center'>
                <input type='checkbox'
                    id='privacy'
                    ref={ref}
                    checked={isAgreed}
                    onChange={e => setIsAgreed(e.target.checked)}
                    className='w-5 h-5 cursor-pointer outline-none accent-main transition-color duration-300'
                />
                <label htmlFor='privacy' className='cursor-pointer select-none'>{PRIVACY_POLICY.LABEL}</label>
            </div>
        </div>
    )
    })

PolicySection.displayName = "PolicySection";
export default PolicySection;