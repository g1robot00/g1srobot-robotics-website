'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { SECTION_PY } from '@/constants/styles'
import { CATEGORY_MAP, LANGUAGE_MAP } from '@/constants/techDoc'
import Container from '@/components/shared/Container'
import Badge from '@/components/ui/Badge'
import { techDocDTO } from '@/types/respDto'
import { ChevronDown, Download } from 'lucide-react'

interface TechDocContainerProps {
  techDocs: techDocDTO[]
}

export default function TechDocContainer({techDocs}: TechDocContainerProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const testList = [...techDocs, ...techDocs, ...techDocs, ... techDocs]

  return (
    <section className='w-full font-sans'>
      <Container className={SECTION_PY.base}>
        <div className='flex flex-col gap-3'>
          {testList.map((item, idx)=> (
              // FIXME 키 id로 변경, idx.toString들까지 다
              <button key={idx} 
                      onClick={() => setOpenItemId(openItemId !== idx.toString() ? idx.toString() : null)}
                      className='grid grid-cols-6 gap-y-2 md:grid-cols-12 w-full bg-white p-5 rounded-xl border border-gray-200 cursor-pointer'
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
                              className='flex items-center text-main font-bold cursor-pointer'
                      >
                        <span>{item.files?.length || 0} files</span>
                        <ChevronDown size={14} className={cn("transition-transform", openItemId === idx.toString() && "rotate-180")}/>
                      </div>
                      {openItemId === idx.toString() &&
                        <div className='absolute top-full -left-1/2 z-50 flex flex-col gap-y-1 min-w-[200px] md:min-w-[240px] bg-blue-50 rounded-lg shadow-lg p-5'>
                          {item.files.map(i =>
                            <a key={i.key}
                              href={`${i.url}?dl=${i.name}`}
                              rel="noopener noreferrer" // 보안설정
                              // target="_blank"
                              className='flex items-start gap-1 underline cursor-pointer hover:text-gray-500 transition-colors'
                              download={i.name}
                            >
                              <Download  size={14} strokeWidth={3} className='flex-shrink-0 mt-1'/>
                              <span className='font-bold'>{i.name}</span><br />
                            </a>
                          )}
                        </div>
                      }
                    </div>
                  </div>
              </button>
            )
          )}
        </div>
      </Container>
    </section>
  )
}
