'use client'

import { useState, useEffect, useMemo } from 'react'


import UseCaseCard from '@/components/elements/card/UseCaseCard'
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { UseCaseDTO, IndustryListDTO, ProductDTO } from '@/types/respDto';
import { RotateCw } from 'lucide-react';


interface UseCaseContainerProps {
    initialUseCases: UseCaseDTO[]
    industries: IndustryListDTO[]
    products: ProductDTO[]
}

export default function UseCaseContainer({ initialUseCases, industries, products }: UseCaseContainerProps) {
    const [filterType, setFilterType] = useState<'industry' | 'product'>('industry'); 
    const [selectedFilters, setSelectedFilters] = useState<string[] >([]);  //현재 선택된 필터
    const [filteredCases, setFilteredCases] = useState(initialUseCases);    // 화면에 뿌릴 데이터

    // 선택가능한 모든 옵션 변수로 추출
    const currentOptions = useMemo(() => {
        return filterType === 'industry'
            ? industries.map(i => i.label)
            : products.map(p => p.label)
    },[filterType, industries, products])
    
    // 전체 선택 여부 확인
    const isAllSelected = selectedFilters.length === currentOptions.length && currentOptions.length > 0;

    //탭 변경 시 전체 선택 상태로 초기화
    useEffect(()=>{
        setSelectedFilters(currentOptions);
    }, [currentOptions])

    // 전체 선택/해제 함수
    const handleAllToggle = () => {
        if (isAllSelected) setSelectedFilters([]);
        else setSelectedFilters(currentOptions);
    }

    // 핸들 on/off 로직
    const handleToggle = (label: string) => {
        setSelectedFilters(
            prev => prev.includes(label)
                ?prev.filter(item => item !== label)
                : [...prev, label]
            );
    };

    // 검색하기 필터링 수행
    const handleSearch = () => {
        if (selectedFilters.length === 0) {
            setFilteredCases(initialUseCases);
            return;
        } else {
            const filtered = initialUseCases.filter(uc => {
                if (filterType === 'industry') {
                    return uc.industries.some(ind => selectedFilters.includes(ind.name));
                }
                if (filterType === 'product') {
                    return uc.products.some(prod => selectedFilters.includes(prod.name));
                }
            });
            setFilteredCases(filtered);
        }
    }


    return (
        <section className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20'> 
            <div className='py-10 border-b border-gray-300  flex flex-col gap-5 items-center'>
                <div className='flex gap-3 text-base md:text-xl font-bold text-gray-400 '>
                    <button onClick={() => setFilterType('industry')}
                            className={`${filterType === 'industry' ? 'text-main' : ''} cursor-pointer `}
                    >
                        산업군별
                    </button>
                    |
                    <button onClick={() => setFilterType('product')}
                            className={`${filterType === 'product' ? 'text-main' : ''} cursor-pointer `}
                    >
                        제품군별
                    </button>
                </div>
                <div className='max-w-4xl flex flex-wrap gap-1 md:gap-3 justify-center'>
                    <Badge label= '전체' 
                            variant='filter'
                            isActive={isAllSelected}
                            onClick={handleAllToggle}
                    />
                    {(filterType === 'industry' ? industries : products).map(item => (
                        <Badge key={item.label}
                                label={item.label}
                                variant='filter' 
                                isActive={selectedFilters.includes(item.label)}
                                onClick={()=>handleToggle(item.label)}
                        />
                    ))}
                </div>
                <div className='flex gap-2'>
                    <Button label='검색하기'
                            onClick = {handleSearch}
                            className=''
                    />
                </div>
            </div>

            {/* use cases card */}
            <div className='py-10 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-5'>
                {filteredCases.length > 0
                    ? filteredCases.map(item => (
                        <UseCaseCard key={item.title}
                            useCase={item}
                        />
                    ))
                    : (
                        <p className='col-span-full flex justify-center font-bold text-gray-400'>
                            등록된 사례가 없습니다.
                        </p>
                    )
                }
            </div>
        </section>
    )
}
