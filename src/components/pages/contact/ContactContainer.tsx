import { SECTION_PY } from '@/constants/styles'
import { FEATURE_FLAGS } from '@/constants/config'
import InquiryPreparing from '@/components/shared/InquiryPreparing'
import Container from '@/components/shared/Container'
import InquiryForm from '@/components/elements/contact/InquiryForm'
import ContactHeader from './ContactHeader'
import { ContactDTO } from '@/types/respDto'

interface ContactContainerProps {
  initialContact: ContactDTO
}

export default function ContactContainer({initialContact}: ContactContainerProps) {

  return (
    <section className='w-full'>
      <Container className={`${SECTION_PY.base} flex flex-col gap-16`}>
        {FEATURE_FLAGS.IS_INQUIRY_ENABLED
          ?
            <div>
              <ContactHeader initialContact={initialContact}/>
              <InquiryForm />
            </div>
          : <InquiryPreparing initialContact={initialContact}/>
          }
      </Container>
    </section>
  )
}
