import React from 'react'

import { COMPANY_TABS } from '@/constants/company'
import AboutSection from './AboutSection'
import ClientsSection from './ClientsSection'
import HistorySection from './HistorySection'
import { CompanyDTO } from '@/types/respDto'

interface CompanyContainerProps {
  company: CompanyDTO
}

export default function CompanyContainer({company}: CompanyContainerProps) {
  const {slogan, about, business, vision, clients, history} = company;

  return (
    <div className='w-full'>
      <AboutSection slogan={slogan} about={about} business={business} vision={vision} idAbout={COMPANY_TABS[0].id} idVision={COMPANY_TABS[1].id}/>
      {/* <ClientsSection clients={clients} id= {COMPANY_TABS[2].id}/> */}
      <HistorySection history={history} id= {COMPANY_TABS[2].id}/>
    </div>
  )
}
