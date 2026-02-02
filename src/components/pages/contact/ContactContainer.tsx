'use client'

import InquiryForm from '@/components/elements/contact/InquiryForm'
import { useInquiryForm } from '@/hooks/useInquiryForm'
import ContactHeader from './ContactHeader'


export default function ContactContainer() {

  return (
    <section className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20
                        flex flex-col gap-16'
    >
      <ContactHeader />

      <InquiryForm />
    </section>
  )
}
