import { SECTION_PY } from '@/constants/styles'
import Container from '@/components/shared/Container'
import InquiryForm from '@/components/elements/contact/InquiryForm'
import ContactHeader from './ContactHeader'


export default function ContactContainer() {

  return (
    <section className='w-full'>
      <Container className={`${SECTION_PY.base} flex flex-col gap-16`}>
        <ContactHeader />
        <InquiryForm />
      </Container>
    </section>
  )
}
