import React from 'react'
import Image from 'next/image';

import {  RobotDetailDTO } from '@/types/respDto'
import { ImageOff } from 'lucide-react';

interface DescriptionSectionProps {
    product: RobotDetailDTO
}

export default function ProductDescriptionSection({product}: DescriptionSectionProps) {
    const {productLine, industries, specs, components} = product

    const industryJoin = industries.map(i => i).join(' / ')
    const detailList = [
        // ...(productLine ? [{title: '제품군', content: productLine}] : []),

        // ...(industries?.length > 0
        //     ?[{title: '적용 산업', content: industries.map(i => i.name).join(', ')}]
        //     : []
        // )
        // specs?.length > 0 
    ]
    console.log('부품: ', components)

    const descriptionList = [
        '적재량/면적/재질', '시스템 구성/기본 구성품', '안전기능/사용설명', '활용사례'
    ]
  return (
    <div className='grid grid-cols-1 gap-25 '>
        <div className='flex flex-col gap-10'>
            <h3 className='font-bold text-base md:text-lg text-gray-700'>적용산업</h3>
            <div>
                <span className='text-gray-500'>{industryJoin}</span>
            </div>
        </div>
        { specs && specs.length > 0 &&
            <div className='flex flex-col gap-10'>
                <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 사양</h3>
                <div className='divide-y divide-gray-200 space-y-6'>
                    {specs.map((item, idx) => (
                        <div key={`${idx}_${item}`}
                            className='flex justify-between'
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
        { components && components.length > 0 &&
            <div className='flex flex-col gap-10'>
                <h3 className='font-bold text-base md:text-lg text-gray-700'>적용부품</h3>
                <div className='grid grid-cols-4 md:grid-cols-8'>
                    {components?.map((item) => (
                        <div key={item.id} className='flex flex-col gap-2'>
                            <div className='relative flex-1 h-full w-full overflow-hidden aspect-square'>
                                {item.mainImage 
                                    ? (<Image src={item.mainImage} alt={item.name} fill className="object-cover"/>)
                                    : (
                                        <div className='w-full h-full bg-gray-200 text-gray-400 text-[9px]
                                                        flex flex-col gap-2 justify-center items-center'
                                        >
                                            <ImageOff size={20}/>
                                            이미지 준비중
                                        </div>
                                    )
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
