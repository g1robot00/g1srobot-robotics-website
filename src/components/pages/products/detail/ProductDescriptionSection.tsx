import Image from 'next/image';
import Link from 'next/link';

import {  UniversalDetailDTO } from '@/types/respDto'
import { ImageOff } from 'lucide-react';

interface DescriptionSectionProps {
    product: UniversalDetailDTO
}

export default function ProductDescriptionSection({product}: DescriptionSectionProps) {
    const {productLine, industries, specs, robots, components} = product

    const RelatedItems = robots || components || [];
    const industryJoin = industries.map(i => i).join(' / ')
    const detailList = [
        // ...(productLine ? [{title: '제품군', content: productLine}] : []),

        // ...(industries?.length > 0
        //     ?[{title: '적용 산업', content: industries.map(i => i.name).join(', ')}]
        //     : []
        // )
        // specs?.length > 0 
    ]

  return (
    <div className='grid grid-cols-1 gap-15 md:gap-25 '>
        <div className='flex flex-col gap-5 md:gap-10'>
            <h3 className='font-bold text-base md:text-lg text-gray-700'>적용산업</h3>
            <div>
                <span className='text-gray-500'>{industryJoin}</span>
            </div>
        </div>
        { specs && specs.length > 0 &&
            <div className='flex flex-col gap-10'>
                <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 사양</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-20 '>
                    {specs.map((item, idx) => (
                        <div key={`${idx}_${item}`}
                            className='flex justify-between border-b border-gray-200 '
                        >
                            <span className='text-sm md:text-base text-gray-500'>{item.label}</span>
                            <span className='text-base md:text-lg font-semibold'>
                                {item.value}
                                {item.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        }
        { RelatedItems && RelatedItems.length > 0 &&
            <div className='flex flex-col gap-10'>
                <h3 className='font-bold text-base md:text-lg text-gray-700'>구성 핵심 부품</h3>
                <div className='grid gap-3 grid-cols-4 md:grid-cols-8'>
                    {RelatedItems?.map((item,idx) => (
                        <div key={`${idx}_${item.id}`} className='flex flex-col gap-2'>
                            <div className='relative flex-1 h-full w-full overflow-hidden aspect-square'>
                                {item.mainImage 
                                    ?<Link href={item.href}>
                                        <Image src={item.mainImage} alt={item.name} fill className="object-cover"/>
                                    </Link>
                                    :<div className='w-full h-full bg-gray-200 text-gray-400 text-[9px]  flex flex-col gap-2 justify-center items-center'>
                                        <ImageOff size={20}/>
                                        이미지 준비중
                                    </div>
                                }
                            </div>
                            <span className='text-sm md:text-base text-gray-500'>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        }
    </div>
  )
}
