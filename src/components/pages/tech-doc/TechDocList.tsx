import React from 'react'

import { cn } from '@/lib/utils'
import { CATEGORY_MAP, LANGUAGE_MAP } from '@/constants/techDoc'
import Badge from '@/components/ui/Badge'
import { TechDocDTO } from '@/types/respDto'
import { ChevronDown, Download } from 'lucide-react'

interface TechDocListProps{
    filteredDocs: TechDocDTO[]
    activeId: string | null;
    onListClick: (id:string) => void;
    listRef: React.RefObject<HTMLDivElement | null>;
    onReset: () => void
}

export default function TechDocList({ filteredDocs, activeId, onListClick, listRef, onReset }: TechDocListProps) {
    return (
        <div ref={listRef} className='flex flex-col '>
            { filteredDocs && filteredDocs.length > 0
                ?filteredDocs?.map(item => (
                    <div key={item.id}
                        onClick={() => onListClick(item.id)}
                        className={cn('grid grid-cols-6 gap-y-2 md:gap-y-0 md:grid-cols-12',
                            'w-full bg-white py-7 px-5 border-b border-gray-300 cursor-pointer hover:bg-gray-100 hover:rounded-lg',
                            'group items-start text-left transition-color', activeId === item.id && 'bg-gray-100')}
                    >
                        <Badge label={CATEGORY_MAP[item.category].label}
                            className={`col-span-6 md:col-span-2 ${CATEGORY_MAP[item.category].color} w-fit shadow-none px-4`}
                        />
                        <p className='col-span-6 font-bold text-xl  max-md:min-h-[3rem] line-clamp-2 md:truncate'>{item.title}</p>
                        <div className='col-span-6 md:col-span-4 flex max-md:gap-2 md:grid md:grid-cols-4'>
                            <p className='md:col-span-2 text-gray-700 after:content-["|"] after:ml-2 after:text-gray-300 md:after:content-none'>{item.releaseDate}</p>
                            <div className='relative md:col-span-2'>
                                <div
                                    className={cn('flex items-center text-gray-800 group-hover:text-main font-bold cursor-pointer', activeId === item.id && 'text-main')}
                                >
                                    <span>{item.files?.length || 0} files</span>
                                    <ChevronDown size={14} className={cn("transition-transform", activeId === item.id && "rotate-180")} />
                                </div>
                                {activeId === item.id &&
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
                                                <Download size={14} strokeWidth={3} className='flex-shrink-0 mt-1' />
                                                <span className='font-bold'>{i.name}</span><br />
                                            </a>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
                : <div className='py-40 text-center flex flex-col gap-4 items-center'>
                    <p className='text-gray-400 text-base md:text-xl font-menium'>선택한 조건에 맞는 자료가 없습니다.</p>
                    <button onClick={onReset}
                            className='text-gray-400 underline text-sm md:text-base font-bold cursor-pointer'
                    >
                        필터 초기화
                    </button>
                </div>
            }
        </div>
    )
}
