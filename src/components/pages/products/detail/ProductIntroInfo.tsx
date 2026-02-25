'use client'

import ProductIntroInfoBreadCrumb from './ProductIntroInfoBreadCrumb'
import { UniversalDetailDTO, DetailNavDTO } from '@/types/respDto'

interface ProductIntroInfoProps {
    product: UniversalDetailDTO
    contextList: DetailNavDTO[]
    from?: 'industry' | 'productLine'
}

export default function ProductIntroInfo({product,contextList, from}: ProductIntroInfoProps) {
    const mainSpecs = product.specs.slice(0, 3);
    const industryJoin = product.industries.map(i => i).join(' / ')

    return (
        <div className='flex-1 flex flex-col gap-5 md:gap-10 min-h-0 '> {/* min-h-0은 flex 자식이 스크롤될 때 필수 */}
            <div className='pb-2 md:pb-5 border-b border-gray-200 flex flex-col gap-2 md:gap-3'>
                <ProductIntroInfoBreadCrumb product={product} contextList={contextList} from={from} />
                <div className='flex flex-col gap-1'>
                    <h4 className='text-2xl md:text-4xl font-bold'>{product.name}</h4>
                    <p className='text-base md:text-lg font-bold text-gray-500'>{product.nameEn}</p>
                </div>
            </div>
            <div className='hidden md:flex justify-between px-2'>
                {mainSpecs.map(spec => (
                    <div key={spec.label} className='flex flex-col'>
                        <div className='text-lg md:text-2xl font-semibold'>
                            <span>{spec.value}</span>
                            <span>{spec.unit}</span>
                        </div>
                        <span className='text-sm text-gray-400'>{spec.label}</span>
                    </div>
                ))}
            </div>
            <div className='flex-1 p-5 bg-gray-100 rounded-lg oveflow-y-auto'>
                <div className='flex flex-col gap-6'>
                        {from === 'industry'
                        ? <span className='w-fit px-3 py-2 bg-main/20 rounded-full text-main text-sm font-bold'>{product.productLine}</span>
                        
                        :<div className='flex gap-1 flex-wrap'> 
                            {product.industries.map(i =>
                                <span key={i} className='w-fit px-3 py-2 bg-main/20 rounded-full text-main text-sm font-bold'>{i}</span>
                            )}
                        </div>
                        }
                    <div className='text-gray-800 whitespace-pre-wrap '>
                    {product.description}
                    </div>
                </div>
            </div>
        </div>
    )
}
