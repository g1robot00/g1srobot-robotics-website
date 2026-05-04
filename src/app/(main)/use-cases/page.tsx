
import React from 'react'
import { client } from "@/lib/sanity";

import {USE_CASES_PAGE_QUERY} from '@/lib/queries'
import { getHeroDataByPath } from '@/lib/nav-utils';
import HeroBanner from '@/components/shared/hero/HeroBanner'
import UseCaseContainer from '@/components/pages/use-cases/UseCaseContainer';
import {UseCasePageDTO} from '@/types/respDto';

export const metadata = {
  title: "적용 사례",
  description: "다양한 자동창고 및 제조 현장에 도입된 지원에스로봇 G1sRobot 의 실제 사례를 확인하세요. 좁은 공간에서도 극대화된 물류 효율과 공정 무인화 성공 사례를 공유합니다."
}

export default async function page() {
  const useCases: UseCasePageDTO = await client.fetch(USE_CASES_PAGE_QUERY) || [];

  const heroData = getHeroDataByPath('/use-cases');

  return (
    <main className=''>
        <HeroBanner heroData={heroData}/>
        <UseCaseContainer initialData = {useCases}/>
    </main>
  )
}
