
import React from 'react'
import { client } from "@/lib/sanity";

import { 
  USE_CASES_QUERY, 
  INDUSTRY_LIST_QUERY,
  PRODUCTS_QUERY
} from '@/lib/queries'
import HeroBanner from '@/components/shared/hero/HeroBanner'
import UseCaseContainer from '@/components/pages/use-cases/UseCaseContainer';
import { 
  UseCaseDTO, 
  IndustryListDTO, 
  ProductDTO 
} from '@/types/respDto';

export default async function page() {
  const useCases: UseCaseDTO[] = await client.fetch(USE_CASES_QUERY) || [];
  const industries: IndustryListDTO[] = await client.fetch(INDUSTRY_LIST_QUERY) || [];
  const products: ProductDTO[] = await client.fetch(PRODUCTS_QUERY) || []



  return (
    <main className=''>
        <HeroBanner />
        <UseCaseContainer initialUseCases = {useCases}
                          industries = {industries}
                          products = {products}
        />
    </main>
  )
}
