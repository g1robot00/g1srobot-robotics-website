import { client } from '@/lib/sanity'

import { LOCATION_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import LocationContainer from '@/components/pages/company/location/LocationContainer'
import { LocationDTO } from '@/types/respDto'

export const metadata = {
    title: "위치 및 연락처",
    description: "지원에스로봇 G1sRobot 연락수단을 안내해 드립니다. 방문을 위한 주소와 연락처를 확인하세요."
}

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
