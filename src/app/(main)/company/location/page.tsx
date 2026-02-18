import React from 'react'
import { client } from '@/lib/sanity'

import { LOCATION_QUERY } from '@/lib/queries'
import HeroBanner from '@/components/shared/hero/HeroBanner'
import LocationContainer from '@/components/pages/company/location/LocationContainer'
import { LocationDTO } from '@/types/respDto'

export default async function page() {
    const contact: LocationDTO = await client.fetch(LOCATION_QUERY);
    console.log('연락수단: ', contact)

    return (
        <div >
            <HeroBanner />
            <LocationContainer contact={contact}/>
        </div>
    )
}
