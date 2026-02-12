import React from 'react'

import AboutSection from './AboutSection'
import BusinessSection from './BusinessSection'
import ClientsSection from './ClientsSection'
import HistorySection from './HistorySection'
import { CompanyDTO } from '@/types/respDto'

export default function CompanyContainer({company}: {company: CompanyDTO}) {
  const {slogan, about, business, vision, clients, history} = company;

  return (
    <div className='w-full '>
      <AboutSection slogan={slogan} about={about} business={business} vision={vision}/>
      {/* <BusinessSection /> */}
      <ClientsSection clients={clients}/>
      <HistorySection history={history}/>
    </div>
  )
}
