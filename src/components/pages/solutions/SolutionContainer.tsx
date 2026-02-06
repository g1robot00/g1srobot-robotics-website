// FIXME ProductContainer랑 합쳤으니 삭제 
// -- ProductContainer를 어떤 폴더로 보낼것인가
import React from 'react'

import ProductCard from '@/components/elements/card/ProductCard'
import { IndustryProductsDTO, ProductItemDTO } from '@/types/respDto'

interface SolutionContainerProps {
  industries: IndustryProductsDTO[]
}

export default function SolutionContainer({ industries }: SolutionContainerProps) {
  return (
    <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20'>
      {industries.map((ind: IndustryProductsDTO) => (
        <section key={ind.id} id={ind.id} className="mb-30 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mb-10">{ind.label}</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {ind.kind.map((product: ProductItemDTO) => (
              <ProductCard key={product.href} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
