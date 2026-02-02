'use client'

import { useInquiryForm } from '@/hooks/useInquiryForm'
import ContactHeader from './ContactHeader'
import ContactForm from './ContactForm'
import PolicySection from './PolicySection'
import Button from '@/components/ui/Button'



export default function ContactContainer() {
  const {isAgreed, setIsAgreed, formRefs, agreeRef, handleFormSubmit} = useInquiryForm();

  return (
    <section className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20
                        flex flex-col gap-16'
    >
      <ContactHeader />

      <form onSubmit={handleFormSubmit} className='flex flex-col gap-16'>
        <ContactForm refs={formRefs}/>
        <PolicySection ref={agreeRef}
                      isAgreed={isAgreed} 
                      setIsAgreed={setIsAgreed}
        />

        <div className='flex justify-center'>
          <Button type='submit'
                  label='문의하기'
                  className='md:min-w-80 h-16 text-xl shadow-lg shadow-main/20 '
          />
        </div>
      </form>
    </section>
  )
}
