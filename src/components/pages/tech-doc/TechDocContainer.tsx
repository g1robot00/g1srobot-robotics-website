'use client'

import { useState, useEffect, useRef } from 'react'

import { FEATURE_FLAGS } from '@/constants/config'
import { SECTION_PY } from '@/constants/styles'
import ServicePreparing from '@/components/shared/ServicePreparing'
import TechDocFilter from './TechDocFilter'
import TechDocList from './TechDocList'
import Container from '@/components/shared/Container'
import { TechDocDTO, ContactDTO } from '@/types/respDto'

interface TechDocContainerProps {
  techDocs: TechDocDTO[]
  selectedId?: string | null
  contact: ContactDTO | null
}

export default function TechDocContainer({techDocs, selectedId, contact}: TechDocContainerProps) {
  const [filterIds, setFilterIds] = useState<string[]>( selectedId ? [selectedId] : [] );
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 외부클릭시 닫음
  useEffect(() => {
    if(!activeId) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if(listRef.current && !listRef.current.contains(e.target as Node)) { // ref가 실제 DOM요소와 잘 연결되어있는가 && e.target(방금 클릭한 요소)가 ref요소에 포함(contains)되어있는가
        setActiveId(null);
      }
    };

    if (activeId !== null) {
      window.addEventListener('mousedown', handleOutsideClick);
    };

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [activeId]);
  
  // 필터 토글함수
  const toggleFilter = (id: string) => {
    setFilterIds(prev => prev?.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  // 다중 필터링 로직
  const filteredDocs = 
  filterIds.length === 0 
  ? techDocs 
  : techDocs.filter(doc => doc.relatedProducts?.some(product => filterIds.includes(product.id) ));

  const handleListClick = (id: string) => {
    setActiveId(prev => (prev === id ? null : id))
  }


  return (
    <section className='w-full'>
      {FEATURE_FLAGS.IS_TECH_DOC_ENABLED
        ?
        <Container className={`${SECTION_PY.base} flex flex-col gap-5`}>
          <TechDocFilter />
          <TechDocList 
            filteredDocs={filteredDocs} 
            activeId={activeId}
            onListClick={handleListClick}
            listRef={listRef}
          />
        </Container>
        :
        <Container className={SECTION_PY.base}>
          <ServicePreparing initialContact={contact}/>
        </Container>
      }
    </section>
  )
}
