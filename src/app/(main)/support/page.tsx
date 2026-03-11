import { client } from '@/lib/sanity'

import { CONTACT_QUERY } from '@/lib/queries'
import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import ContactContainer from '@/components/pages/contact/ContactContainer'
import { ContactDTO } from '@/types/respDto'

export default async function page() {
  const contact: ContactDTO = await client.fetch(CONTACT_QUERY);
  const heroData = getHeroDataByPath('/support');
  
  return (
    <div>
        <HeroBanner heroData={heroData} />
        <ContactContainer contact={contact}/>
    </div>
  )
}
