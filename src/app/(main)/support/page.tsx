import React from 'react'

import { getHeroDataByPath } from "@/lib/nav-utils";
import HeroBanner from '@/components/shared/hero/HeroBanner'
import ContactContainer from '@/components/pages/contact/ContactContainer'

export default function page() {
  const heroData = getHeroDataByPath('/support');
  
  return (
    <div>
        <HeroBanner heroData={heroData} />
        <ContactContainer />
    </div>
  )
}
