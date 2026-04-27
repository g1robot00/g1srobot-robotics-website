'use client'

import { useState, useEffect, useRef } from 'react'

import { FEATURE_FLAGS } from '@/constants/config'
import { SECTION_PY } from '@/constants/styles'
import ServicePreparing from '@/components/shared/ServicePreparing'
import TechDocFilter from './TechDocFilter'
import TechDocList from './TechDocList'
import Container from '@/components/shared/Container'
import { TechDocPageDTO, ContactDTO } from '@/types/respDto'
import { CATEGORY_MAP } from '@/constants/techDoc'

interface TechDocContainerProps {
  techDocData: TechDocPageDTO
  selectedId?: string | null
  contact: ContactDTO | null
}

export default function TechDocContainer({ techDocData, selectedId, contact }: TechDocContainerProps) {
  const { techDocs, activeCategoryIds, productOptions } = techDocData;
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [productIds, setProductIds] = useState<string[]>(selectedId ? [selectedId] : []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 외부클릭시 닫음
  useEffect(() => {
    if (!activeId) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) { // ref가 실제 DOM요소와 잘 연결되어있는가 && e.target(방금 클릭한 요소)가 ref요소에 포함(contains)되어있는가
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

  // 카테고리 옵션
  const categoryOptions = Object.entries(CATEGORY_MAP).map(([id, info]) => ({
    id,
    name: info.label,
    isEmpty: !activeCategoryIds.includes(id)
  }));

  // 카테고리 토글함수
  const toggleCategory = (id: string) => {
    setCategoryIds(prev => prev?.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  }

  // 제품 토글함수
  const toggleProduct = (id: string) => {
    setProductIds(prev => prev?.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  }

  // 다중 필터링 로직
  const filteredDocs = techDocs.filter(doc => {
    const matchCategory = categoryIds.length === 0 || categoryIds.includes(doc.category);
    const matchProduct = productIds.length === 0 || 
                        doc.relatedProducts?.some(product => productIds.includes(product.id));
    return matchCategory && matchProduct
  })

  const handleReset = () => {
    setCategoryIds([]);
    setProductIds([]);
  }

  const handleListClick = (id: string) => {
    setActiveId(prev => (prev === id ? null : id))
  }


  return (
    <section className='w-full'>
      {FEATURE_FLAGS.IS_TECH_DOC_ENABLED
        ?
        <Container className={`${SECTION_PY.base} flex flex-col gap-5`}>
          <TechDocFilter 
            categoryOptions={categoryOptions}
            productOptions={productOptions}
            selectedCategoryIds={categoryIds}
            selectedProductIds={productIds}
            onCategoryToggle={toggleCategory}
            onProductToggle={toggleProduct}
            onReset={handleReset}
          />
          {techDocs && techDocs.length > 0 
            ?<TechDocList
              filteredDocs={filteredDocs}
              activeId={activeId}
              onListClick={handleListClick}
              listRef={listRef}
              onReset={handleReset}
            />
            :<div className='py-40 text-center flex flex-col gap-4 items-center'>
                <p className='text-gray-400 text-base md:text-xl font-menium'>등록된 자료가 없습니다.</p>
            </div>
        }
        </Container>
        :
        <Container className={SECTION_PY.base}>
          <ServicePreparing initialContact={contact} />
        </Container>
      }
    </section>
  )
}
