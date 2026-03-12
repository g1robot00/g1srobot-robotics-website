import { SECTION_PY } from '@/constants/styles'
import { FEATURE_FLAGS } from '@/constants/config'
import ServicePreparing from '@/components/shared/ServicePreparing'
import Container from '@/components/shared/Container'
import InquiryFormWrapper from '@/components/elements/contact/InquiryFormWrapper'
import InquiryForm from '@/components/elements/contact/InquiryForm'
import ContactHeader from './ContactHeader'
import { ContactDTO } from '@/types/respDto'

interface ContactContainerProps {
  contact: ContactDTO
}

export default function ContactContainer({contact}: ContactContainerProps) {

  return (
    <section className='w-full'>
        {FEATURE_FLAGS.IS_INQUIRY_ENABLED
          ?
            <Container className={`${SECTION_PY.base} flex flex-col gap-16`}>
              <ContactHeader initialContact={contact}/>
              <InquiryFormWrapper />
            </Container>
          : 
            <Container className={SECTION_PY.base}>
              <ServicePreparing initialContact={contact}/>
            </Container>
          }
    </section>
  )
}
