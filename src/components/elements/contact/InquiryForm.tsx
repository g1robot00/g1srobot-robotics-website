'use client'

import { useInquiryForm } from '@/hooks/useInquiryForm'
import ContactForm from './ContactForm'
import PolicySection from './PolicySection'
import Button from '@/components/ui/Button'

export default function InquiryForm({ productName }: { productName?: string }) {
    const { isAgreed, setIsAgreed, formRefs, agreeRef, handleFormSubmit } = useInquiryForm();
    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-10 md:gap-16'>
            <ContactForm refs={formRefs} defaultProductName={productName} />

            <PolicySection ref={agreeRef} isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
            
            <div className='flex justify-center'>
                <Button type='submit'
                    label='문의하기'
                    className='min-w-50 h-12 md:min-w-80 md:h-16 text-base md:text-xl shadow-lg shadow-main/20 '
                />
            </div>
        </form>
    )
}
