import React from 'react'
import { client } from '@/lib/sanity'

import { CONTACT_QUERY } from '@/lib/queries'
import HeroBanner from '@/components/shared/hero/HeroBanner'
import LocationContainer from '@/components/pages/company/location/LocationContainer'
import { ContactDTO } from '@/types/respDto'

export default async function page() {
    const contact: ContactDTO = await client.fetch(CONTACT_QUERY);
    console.log('연락수단: ', contact)

    return (
        <div >
            <HeroBanner />
            <LocationContainer contact={contact}/>
        </div>
    )
}
