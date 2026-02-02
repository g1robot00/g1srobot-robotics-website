'use client'

import { useInquiryForm } from '@/hooks/useInquiryForm'
import ContactForm from '../../contact/ContactForm'
import PolicySection from '../../contact/PolicySection'
import Button from '@/components/ui/Button'

export default function ProductInquirySection({productName}: {productName: string}) {
  const {isAgreed, setIsAgreed, formRefs, agreeRef, handleFormSubmit} = useInquiryForm();

  return (
    <section>
      {/* FIXME  ProudctDescriptionSection의 span과 똑같은데 통일되게 사용할 수 있도록 */}
      <h2 className='text-lg text-main font-bold mb-5'>제품문의</h2>

      {/* FIXME ContactContainer와 형태 똑같은데 통일되게 가져와서 쓸수있는 컴포넌트? */}
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-16'>
        <ContactForm refs={formRefs} defaultProductName={productName}/>
        <PolicySection ref={agreeRef} isAgreed={isAgreed} setIsAgreed={setIsAgreed}/>
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
