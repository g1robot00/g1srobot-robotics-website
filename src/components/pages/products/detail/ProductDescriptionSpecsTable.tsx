import React from 'react'
import { UniversalDetailDTO } from '@/types/respDto'

interface ProductDescriptionSpecsTableProps {
    specs: UniversalDetailDTO['specs'];
}

export default function ProductDescriptionSpecsTable({ specs }: ProductDescriptionSpecsTableProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-20 '>
            {specs.map((item, idx) => (
                <div key={`${idx}_${item}`}
                    className='flex justify-between gap-2 border-b border-gray-200 '
                >
                    <span className='text-sm md:text-base text-gray-500'>{item.label}</span>
                    {item.value
                        ? <span className='text-base md:text-lg font-semibold text-right'>
                            {item.value}
                            {item.unit}
                        </span>
                        : <span className='text-base md:text-lg font-semibold text-right'>-</span>
                    }
                </div>
            ))}
        </div>
    )
}
