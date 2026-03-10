'use client'

import InquiryForm from '@/components/elements/contact/InquiryForm'
import { useInquiryForm } from '@/hooks/useInquiryForm'

export default function ProductInquirySection({productName}: {productName: string}) {

  return (
    <section>
      <h2 className='text-lg text-main font-bold mb-5'>제품문의</h2>
      <InquiryForm productName={productName} />
    </section>
  )
}
