import { useInquiryForm } from '@/hooks/useInquiryForm'
import ContactForm from './ContactForm'
import PolicySection from './PolicySection'
import Button from '@/components/ui/Button'

export default function InquiryForm({ productName }: { productName?: string }) {
    const { isAgreed, setIsAgreed, formRefs, agreeRef, handleFormSubmit } = useInquiryForm();
    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-16'>
            <ContactForm refs={formRefs} defaultProductName={productName} />

            <PolicySection ref={agreeRef} isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
            
            <div className='flex justify-center'>
                <Button type='submit'
                    label='문의하기'
                    className='md:min-w-80 h-16 text-xl shadow-lg shadow-main/20 '
                />
            </div>
        </form>
    )
}
