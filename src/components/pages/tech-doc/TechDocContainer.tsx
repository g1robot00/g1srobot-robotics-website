'use client'

import { useState, useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'
import { SECTION_PY } from '@/constants/styles'
import { CATEGORY_MAP, LANGUAGE_MAP } from '@/constants/techDoc'
import Container from '@/components/shared/Container'
import Badge from '@/components/ui/Badge'
import { TechDocDTO } from '@/types/respDto'
import { Funnel, ChevronDown, Download } from 'lucide-react'

interface TechDocContainerProps {
  techDocs: TechDocDTO[]
  selectedId?: string | null
}

export default function TechDocContainer({techDocs, selectedId}: TechDocContainerProps) {
  const [filterIds, setFilterIds] = useState<string[]>( selectedId ? [selectedId] : [] );
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  console.log(filterIds)
  
  // 외부클릭시 닫음
  useEffect(() => {
    if(!openItemId) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if(listRef.current && !listRef.current.contains(e.target as Node)) { // ref가 실제 DOM요소와 잘 연결되어있는가 && e.target(방금 클릭한 요소)가 ref요소에 포함(contains)되어있는가
        setOpenItemId(null);
      }
    };

    if (openItemId !== null) {
      window.addEventListener('mousedown', handleOutsideClick);
    };

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [openItemId]);
  
  // 필터 토글함수
  const toggleFilter = (id: string) => {
    setFilterIds(prev => prev?.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  // 다중 필터링 로직
  // filterIds가 비어있으면 '전체' 노출, 있으면 하나라도 포함된 것 노출
  const filteredDocs = 
  filterIds.length === 0 
  ? techDocs 
  : techDocs.filter(doc => doc.relatedProducts?.some(product => filterIds.includes(product.id) ));
  
  // const testList = [...filteredDocs, ...filteredDocs, ...filteredDocs, ... filteredDocs]; // FIXME 실파일 들어오면 삭제


  return (
    <section className='w-full font-sans'>
      <Container className={`${SECTION_PY.base} flex flex-col gap-5`}>
        <div className='flex items-center gap-5'>
          <Funnel />
          <button className='font-bold text-xl cursor-pointer'>전체</button>
          <span>|</span>
        </div>
        <div ref={listRef} className='flex flex-col '>
          {filteredDocs?.map(item=> (
              <div key={item.id} 
                    onClick={() => setOpenItemId(openItemId !== item.id ? item.id : null)}
                    className={cn('grid grid-cols-6 gap-y-2 md:gap-y-0 md:grid-cols-12',
                                'w-full bg-white py-7 px-5 border-b border-gray-300 cursor-pointer hover:bg-gray-100 hover:rounded-lg',
                              'group items-start text-left transition-color', openItemId === item.id && 'bg-gray-100')}
              > 
                  <Badge label={ CATEGORY_MAP[item.category].label} 
                        className={`col-span-6 md:col-span-2 ${CATEGORY_MAP[item.category].color} w-fit shadow-none px-4`} 
                  />
                  <p className='col-span-6 font-bold text-xl  max-md:min-h-[3rem] line-clamp-2 md:truncate'>{item.title}</p>
                  {/* <p className='text-gray-500'>{item.releaseDate}</p> */}
                  <div className='col-span-6 md:col-span-4 flex max-md:gap-2 md:grid md:grid-cols-4'>
                    {/* {LANGUAGE_MAP[item.language]} */}
                    <p className='md:col-span-2 text-gray-700 after:content-["|"] after:ml-2 after:text-gray-300 md:after:content-none'>{item.releaseDate}</p>
                    <div className='relative md:col-span-2'>
                      <div 
                              className={cn('flex items-center text-gray-800 group-hover:text-main font-bold cursor-pointer', openItemId === item.id && 'text-main')}
                      >
                        <span>{item.files?.length || 0} files</span>
                        <ChevronDown size={14} className={cn("transition-transform", openItemId === item.id && "rotate-180")}/>
                      </div>
                      {openItemId === item.id &&
                        <div className='absolute top-full -left-1/2 z-50 
                                      flex flex-col gap-y-1 
                                      min-w-[200px] md:min-w-[240px] bg-main/20 backdrop-blur-lg rounded-lg shadow-lg p-5'
                        >
                          {item.files.map(i =>
                            <a key={i.key}
                              href={`${i.url}?dl=${i.name}`}
                              rel="noopener noreferrer" // 보안설정
                              // target="_blank"
                              download={i.name}
                              onClick={(e) => e.stopPropagation()}
                              className='flex items-start gap-1 underline cursor-pointer hover:text-gray-500 transition-colors'
                            >
                              <Download  size={14} strokeWidth={3} className='flex-shrink-0 mt-1'/>
                              <span className='font-bold'>{i.name}</span><br />
                            </a>
                          )}
                        </div>
                      }
                    </div>
                  </div>
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  )
}
