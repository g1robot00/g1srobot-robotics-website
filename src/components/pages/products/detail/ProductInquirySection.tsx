import InquiryFormWrapper from '@/components/elements/contact/InquiryFormWrapper'

export default function ProductInquirySection({productName}: {productName: string}) {
  return (
    <section>
      <h2 className='text-lg text-main font-bold mb-5'>제품문의</h2>
      <InquiryFormWrapper productName={productName} />
    </section>
  )
}
