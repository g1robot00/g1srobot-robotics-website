import React from 'react'

export default function ProductDescriptionSection() {
    const descriptionList = [
        '적재량/면적/재질', '시스템 구성/기본 구성품', '안전기능/사용설명', '활용사례'
    ]
  return (
    <div>
        <div className='flex flex-col gap-30 '>
            {descriptionList.map((des, idx) => (
                <span key={idx} className='text-lg text-main font-bold mb-5'>{des}</span>
            ))}
        </div>
    </div>
  )
}
