'use client'

import InquiryForm from '@/components/elements/contact/InquiryForm'
import { useInquiryForm } from '@/hooks/useInquiryForm'

export default function ProductInquirySection({productName}: {productName: string}) {

  return (
    <section>
      {/* FIXME  ProudctDescriptionSection의 span과 똑같은데 통일되게 사용할 수 있도록 */}
      <h2 className='text-lg text-main font-bold mb-5'>제품문의</h2>

      <InquiryForm productName={productName} />
    </section>
  )
}
