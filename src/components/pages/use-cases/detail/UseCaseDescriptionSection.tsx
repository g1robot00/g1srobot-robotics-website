import React from 'react'

export default function UseCaseDescriptionSection() {
    const descriptionList = [
        '시스템', '로봇', '부품'
    ]
    return (
        <div>
            <div className='flex flex-col gap-30 '>
                {descriptionList.map(des => (
                    <span className='text-lg text-main font-bold mb-5'>{des}</span>
                ))}
            </div>
        </div>
    )
}
