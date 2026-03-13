import Image from 'next/image'

import HeroTitle from './HeroTitle'
import PageNav from './PageNav'
import SubCategoryTab from './SubCategoryTab'
import { HeroData, SubtabItem } from '@/types/nav'

interface HeroBannerProps {
  heroData: HeroData;
  subTabs?: SubtabItem[];
}

export default function HeroBanner({ heroData, subTabs }: HeroBannerProps) {
  return (
    <>
      <section className="relative w-full h-[350px] md:h-[75vh] text-white bg-cover bg-center">
        <Image
          src={heroData.heroBg}
          alt={`${heroData.label} Hero Background`}
          fill
          priority
          className='object-cover z-[-2]'
          sizes='100vw'
        />

        <div className='absolute inset-0 z-[-1] bg-black/70 ' />

        <div className='w-full h-full flex flex-col  justify-center items-center text-white'>
          <HeroTitle title={heroData.label} />
          <PageNav />
        </div>
      </section>
      {subTabs && subTabs.length > 0 && <SubCategoryTab list={subTabs} />}
    </>
  )
}
