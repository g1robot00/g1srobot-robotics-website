import React from 'react'

import { SECTION_PY } from '@/constants/styles'
import { CONTACT_LIST } from '@/constants/contact'
import Container from '@/components/shared/Container'
import IconRenderer from '@/components/ui/IconRenderer'
import { ContactDTO } from '@/types/respDto'

export default function LocationContainer({contact}: {contact: ContactDTO}) {
    const contacts = [ contact.address, contact.email, contact.phone]
    return (
        <Container className={`${SECTION_PY.base} flex flex-col gap-10`}>
            {contacts.map(item => (
                <div key={item.value} className='flex gap-3 items-center'>
                    <span className='p-3 rounded-full bg-main/20 text-main'>
                        <IconRenderer iconName={item.iconName} />
                    </span>
                    <span className='text-lg text-gray-800 tracing-tight '>{item.value}</span>
                </div>
            ))}
        </Container>
    )
}
