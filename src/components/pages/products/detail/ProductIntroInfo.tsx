'use client'

import ProductIntroInfoBreadCrumb from './ProductIntroInfoBreadCrumb'
import { UniversalDetailDTO, DetailNavDTO } from '@/types/respDto'

interface ProductIntroInfoProps {
    product: UniversalDetailDTO
    contextList: DetailNavDTO[]
    from?: 'industry' | 'productLine'
}

export default function ProductIntroInfo({ product, contextList, from }: ProductIntroInfoProps) {
    const mainSpecs = product.specs.slice(0, 3);

    return (
        <div className='flex-1 flex flex-col gap-5 md:gap-10 min-h-0 '>
            <div className='flex-shrink-0 pb-2 md:pb-5 border-b border-gray-200 flex flex-col gap-2 md:gap-3'>
                <ProductIntroInfoBreadCrumb product={product} contextList={contextList} from={from} />
                <div className='flex flex-col gap-1'>
                    <h4 className='text-2xl md:text-4xl font-bold break-keep'>{product.name}</h4>
                    <p className='text-base md:text-lg font-bold text-gray-500'>{product.nameEn}</p>
                </div>
            </div>
            <div className='hidden lg:flex lg:justify-between md:gap-2 px-2'>
                {mainSpecs?.map(spec => (
                    <div key={spec.label} className='relative group'>
                        <div key={spec.label} className='flex flex-col gap-1'>
                            <span className='font-medium text-sm text-gray-500'>{spec.label}</span>
                            <div className='text-lg md:text-2xl font-semibold line-clamp-2 break-keep '>
                                {spec.value 
                                    ?<>
                                        <span>{spec.value}</span>
                                        <span className='ml-1'>{spec.unit}</span>
                                    </>
                                    :<span>-</span>
                                }
                            </div>
                        </div>
                        <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded text-xs z-20 bottom-full mt-2">
                            {spec.value}{spec.unit}
                        </div>
                    </div>

                ))}
            </div>
            <div className='flex-1 min-h-0 p-5 bg-gray-100 rounded-lg overflow-y-auto'>
                <div className='flex flex-col gap-6 flex-wrap'>
                    {((from === 'industry' && product.productLine) || (from !== 'industry' && (product.industries?.length || 0) > 0)) &&
                        <>
                            { from === 'industry'
                                ? <span className='w-fit px-3 py-2 bg-main/20 rounded-full text-main text-sm font-bold'>{product.productLine}</span>
                                : <div className='flex gap-1 flex-wrap'>
                                    {product.industries?.map(i =>
                                        <span key={i} className='w-fit px-3 py-2 bg-main/20 rounded-full text-main text-sm font-bold'>{i}</span>
                                    )}
                                </div>
                            }
                        </>
                    }
                    <div className='text-gray-800 whitespace-pre-wrap leading-relaxed'>
                        {product.description}
                    </div>
                </div>
            </div>
        </div>
    )
}
