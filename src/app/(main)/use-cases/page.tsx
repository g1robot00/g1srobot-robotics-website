
import React from 'react'
import { client } from "@/lib/sanity";

import { 
  USE_CASES_QUERY, 
} from '@/lib/queries'
import { getHeroDataByPath } from '@/lib/nav-utils';
import HeroBanner from '@/components/shared/hero/HeroBanner'
import UseCaseContainer from '@/components/pages/use-cases/UseCaseContainer';
import {UseCasePageDTO} from '@/types/respDto';

export default async function page() {
  const useCases: UseCasePageDTO = await client.fetch(USE_CASES_QUERY) || [];
  console.log('useData 데이터: ', useCases)

  const heroData = getHeroDataByPath('/use-cases');

  return (
    <main className=''>
        <HeroBanner heroData={heroData}/>
        <UseCaseContainer initialData = {useCases}/>
    </main>
  )
}
