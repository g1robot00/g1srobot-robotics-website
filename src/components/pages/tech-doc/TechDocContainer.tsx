import React from 'react'

import { SECTION_PY } from '@/constants/styles'
import Container from '@/components/shared/Container'
import { techDocDTO } from '@/types/respDto'
import { Download } from 'lucide-react'

interface TechDocContainerProps {
  techDocs: techDocDTO[]
}

export default function TechDocContainer({techDocs}: TechDocContainerProps) {
  const testList = [...techDocs, ...techDocs, ...techDocs, ... techDocs]

  return (
    <section className='w-full font-sans'>
      
      <Container className={SECTION_PY.base}>
        {/* FIXME 폰트 sans가 예쁘네 */}
        <span>총 {testList.length}개의 자료</span>
        {/* --- 테이블 헤더 --- */}
        {/* border-t-2와 border-b를 사용하여 사진처럼 헤더 강조 */}
        <div className='grid grid-cols-12 border-t-2 border-b border-gray-800 py-4 px-4 bg-white text-sm font-bold text-gray-900 text-center'>
          <div className='col-span-1'>No</div>
          <div className='col-span-2'>구분</div>
          <div className='col-span-5 text-left pl-4'>제목</div>
          <div className='col-span-2'>날짜</div>
          <div className='col-span-2'>다운로드</div>
        </div>
        {/* --- 테이블 리스트 --- */}
        {testList.map((doc, idx) => (
          <div
            key={`${idx}_${doc.title}`}
            // 각 행(Row) 하단에 얇은 선(border-b)을 줍니다.
            // hover 시 배경색이 살짝 변하게 하면 더 고급스럽습니다.
            className='grid grid-cols-12 py-4 px-4 border-b border-gray-200
                      text-sm text-gray-600 items-center text-center
                      hover:bg-gray-50 transition-colors'
          >
            <div className='col-span-1 text-gray-400'>
              {String(idx + 1).padStart(2, '0')}
            </div>
            {/* 2. 구분 (Category) - 데이터에 없다면 임시 텍스트 */}
            <div className='col-span-2 font-medium'>
              {'기술자료'}
            </div>
            {/* 3. 제목 (Title) - 왼쪽 정렬 */}
            <div className='col-span-5 text-left pl-4 font-semibold text-gray-800 truncate'>
              {doc.title}
            </div>
            {/* 4. 날짜 (Date) - 데이터에 없다면 임시 텍스트 */}
            <div className='col-span-2 text-gray-400'>
              { '2024-01-27'}
            </div>
            {/* 5. 다운로드 (Download) */}
            <div className='col-span-2 flex justify-center'>
              {doc.fileUrl ? (
                <a
                  href={`${doc.fileUrl}?dl=${doc.fileName}`}
                  rel="noopener noreferrer" // 보안설정
                  // target="_blank"
                  download={doc.fileName}
                  className='flex items-center gap-1 text-main hover:underline font-bold'
                >
                  <Download size={16} />
                  <span className='hidden md:inline'>Download</span>
                </a>
              ) : (
                <span className='text-gray-300'>-</span>
              )}
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}
