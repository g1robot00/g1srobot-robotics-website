'use client'

import ProductCard from '@/components/elements/card/ProductCard';
import { ProductLineProductsDTO, IndustryProductsDTO, ProductItemDTO} from '@/types/respDto'

interface ProductContainerProps {
    list: ProductLineProductsDTO[] | IndustryProductsDTO[]
    type?: 'filter' | 'normal' // FIXME 제품페이지엔 시스템/로봇 필터 --type === 'detail'
}

export default function ProductContainer({ list, type='normal' }: ProductContainerProps) {
    return (
        <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-15 md:py-20'>
            {list.map((item: ProductLineProductsDTO | IndustryProductsDTO ) => (
                <section key={item.id} id={item.id} className="mb-30 scroll-mt-28">
                    {/* --- 제품군(Product Line) 헤더 --- */}
                    <div className="flex flex-col mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{item.label}</h2>
                        {('content' in item) && item.content && <p className="text-sm md:text-base text-gray-600">{item.content}</p>}
                    </div>

                    {/* --- 해당 제품군에 속한 제품(Products) 리스트 --- */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {item.kind.map((product: ProductItemDTO) => (
                            <ProductCard key={product.href} product={product} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
