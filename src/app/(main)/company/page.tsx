import React from 'react'

import HeroBanner from '@/components/shared/hero/HeroBanner'
import SubCategoryTab from '@/components/shared/hero/SubCategoryTab'
import CompanyContainer from '@/components/pages/company/CompanyContainer'


export default function page() {
  
  const tabList = [
    // {label: 'About', id: }
  ]

  return (
    <div >
        <HeroBanner />
        <CompanyContainer/>
    </div>
  )
}
