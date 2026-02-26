import React from 'react'

import HeroTitle from './HeroTitle'
import PageNav from './PageNav'
import SubCategoryTab from './SubCategoryTab'
import { HeroData, SubtabItem } from '@/types/nav'

interface HeroBannerProps {
  heroData: HeroData;
  subTabs?: SubtabItem[];
}

export default function HeroBanner({heroData, subTabs}: HeroBannerProps) {
  return (
        <>
          <div className='w-full h-[75vh]'>
              <section
                    className="relative w-full h-full flex flex-col items-center justify-center text-white bg-cover bg-center"
                    style={{
                        // 이미지 위에 50% 불투명도의 검은색 막 씌우기
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroData.heroBg})`
                    }}
                >
                    <div className='w-full h-full flex flex-col  justify-center items-center text-white'>
                        <HeroTitle title={heroData.label}/>
                        <PageNav />
                    </div>
                </section>
          </div>
          {subTabs && subTabs.length > 0 && <SubCategoryTab list={subTabs}/>}
        </>
  )
}
