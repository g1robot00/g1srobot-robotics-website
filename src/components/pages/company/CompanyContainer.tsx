import React from 'react'

import AboutSection from './AboutSection'
import BusinessSection from './BusinessSection'
import ClientSection from './ClientSection'
import HistorySection from './HistorySection'

export default function CompanyContainer() {
  return (
    <div className='w-full '>
      <AboutSection />
      <BusinessSection />
      <ClientSection />
      <HistorySection />
    </div>
  )
}
