import React from 'react'
import { client } from '@/lib/sanity'

import { LOCATION_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import LocationContainer from '@/components/pages/company/location/LocationContainer'
import { LocationDTO } from '@/types/respDto'

export default async function page() {
    const contact: LocationDTO = await client.fetch(LOCATION_QUERY);
    const heroData = getHeroDataByPath('/company/location');
    return (
        <div >
            <HeroBanner heroData={heroData}/>
            <LocationContainer contact={contact}/>
        </div>
    )
}
