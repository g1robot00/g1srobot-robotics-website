'use client' // FIXME 카드가 많을 경우 메모활용

import { useState, useEffect, useMemo } from 'react'

import { SECTION_PY } from '@/constants/styles';
import UseCaseOverlay from './UseCaseOverlay';
import UseCaseCard from '@/components/elements/card/UseCaseCard'
import Container from '@/components/shared/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { UseCasePageDTO } from '@/types/respDto';


interface UseCaseContainerProps {
    initialData: UseCasePageDTO
}

export default function UseCaseContainer({ initialData }: UseCaseContainerProps) {
    const {
        useCases: initialUseCases, 
        industryFilters, 
        systemFilters 
    } = initialData
    const [filterType, setFilterType] = useState<'industry' | 'product'>('industry'); 
    const [selectedFilters, setSelectedFilters] = useState<string[] >([]);  //현재 선택된 필터
    const [filteredCases, setFilteredCases] = useState(initialUseCases);    // 화면에 뿌릴 데이터
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedCase = filteredCases.find(item => item.id === selectedId); // FIXME 없을 경우 알림띄우기

    // 선택가능한 모든 옵션 변수로 추출
    const currentOptions = useMemo(() => {
        return filterType === 'industry'
            ? industryFilters.map(i => i.name)
            : systemFilters.map(p => p.name)
    },[filterType, industryFilters, systemFilters])
    
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
                    return uc.industries?.some(ind => selectedFilters.includes(ind.name)) ?? false;
                }
                if (filterType === 'product') {
                    return uc.systems?.some(prod => selectedFilters.includes(prod.name)) ?? false;
                }
                return false;
            });
            setFilteredCases(filtered);
        }
    }

    return (
        <section className='w-full'> 
            <Container className={SECTION_PY.base}>
                <div className='pb-10 border-b border-gray-300  flex flex-col gap-5 items-center'>
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
                        {(filterType === 'industry' ? industryFilters : systemFilters).map(item => (
                            <Badge key={item.name}
                                    label={item.name}
                                    variant='filter'
                                    isActive={selectedFilters.includes(item.name)}
                                    onClick={()=>handleToggle(item.name)}
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
                <div className='py-10 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:!grid-cols-4 gap-x-4 gap-y-10'>
                    {filteredCases.length > 0
                        ? filteredCases.map(item => (
                            <UseCaseCard key={item.id}
                                        useCase={item}
                                        onCardClick={() => setSelectedId(item.id)}

                            />
                        ))
                        : (
                            <p className='col-span-full flex justify-center font-bold text-gray-400'>
                                등록된 사례가 없습니다.
                            </p>
                        )
                    }
                </div>
            </Container>
            {selectedCase && 
                <UseCaseOverlay 
                    useCase={selectedCase}
                    onClose={() => setSelectedId(null)}
                />
            }
        </section>
    )
}
