'use client'

import ProductCard from '@/components/elements/card/ProductCard';
import { ProductLineDTO , ProductItemDTO} from '@/types/respDto'

interface ProductContainerProps {
    productLines: ProductLineDTO[]
}

export default function ProductContainer({ productLines }: ProductContainerProps) {
    return (
        <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20'>
            {productLines.map((line: ProductLineDTO) => (
                <section key={line.id} id={line.id} className="mb-30 scroll-mt-28">
                    {/* --- 제품군(Product Line) 헤더 --- */}
                    <div className="flex flex-col mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{line.label}</h2>
                        <p className="text-sm md:text-base text-gray-600">{line.content}</p>
                    </div>

                    {/* --- 해당 제품군에 속한 제품(Products) 리스트 --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {line.kind.map((product: ProductItemDTO) => (
                            <ProductCard key={product.href} product={product} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
