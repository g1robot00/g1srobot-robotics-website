'use client'
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { SECTION_PY } from '@/constants/styles';
import Container from '@/components/shared/Container';
import ProductCard from '@/components/elements/card/ProductCard';
import Badge from '@/components/ui/Badge';
import { ProductLineProductsDTO, IndustryProductsDTO, ProductItemDTO} from '@/types/respDto'


interface ProductContainerProps {
    from: 'industry' | 'productLine'
    list: ProductLineProductsDTO[] | IndustryProductsDTO[]
    type?: 'filter' | 'normal' // FIXME 제품페이지엔 시스템/로봇 필터 --type === 'detail'
}

const PRODUCT_TYPES = [
    {name: 'system', label: '시스템'}, 
    {name: 'robot', label: '로봇'}, 
    {name: 'component', label: '부품'}, 
]

export default function ProductContainer({ from, list, type='normal' }: ProductContainerProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(PRODUCT_TYPES.map(item => item.name));
    const [filteredList, setFilteredList] = useState<ProductLineProductsDTO[] | IndustryProductsDTO[]>(list);

    const handleToggle = (label: string) => {
        setSelectedFilters(
            prev => prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        )
    }

    useEffect(() => {
        if (selectedFilters.length === 0) {
            setFilteredList([]);
            return;
        }

        const filtered = list.map(pl => ({
            ...pl,
            kind: pl.kind.filter(product => selectedFilters.includes(product.type))
        })).filter(pl => pl.kind.length > 0); //제품이 하나도 안 남은 제품군은 섹션 자체를 숨김;
        
        setFilteredList(filtered);
    }, [selectedFilters, list]);

    return (
        <section className='w-full'>
            <Container className={SECTION_PY.base}>
                { type === 'filter' &&
                    <div className='flex gap-4 items-center border-b border-gray-200 pb-8 mb-12 md:mb-20'>
                        <span className="text-sm font-bold text-gray-400 mr-2 uppercase">Filter</span>
                        <div className='flex gap-2'>
                            {PRODUCT_TYPES.map(item => (
                                <Badge key={item.name}
                                        label={item.label}
                                        variant='filter'
                                        isActive={selectedFilters.includes(item.name)}
                                        onClick={() => handleToggle(item.name)}
                                />
                            ))}
                        </div>
                    </div>
                }
                {filteredList.length > 0
                    ?filteredList.map((item: ProductLineProductsDTO | IndustryProductsDTO ) => (
                        <section key={item.id} id={item.id} className="max-sm:last:mb-0 mb-30 scroll-mt-42">
                            {/* --- 제품군(Product Line) 헤더 --- */}
                            <div className="flex flex-col mb-5 md:mb-10 ">
                                <div className={cn('mb-4 flex flex-col gap-1', 'pl-3 md:pl-5 border-l-6 md:border-l-8 border-l-main rounded-sm md:rounded-md')}>
                                    <p className='font-bold text-sm md:text-base text-main'>{item.nameEn}</p>
                                    <h2 className="text-2xl md:text-4xl font-bold">{item.label}</h2>
                                </div>
                                {/* {('content' in item) && item.content && <p className="text-sm md:text-base text-gray-600 whitespace-pre-wrap">{item.content}</p>} */}
                            </div>
                            {/* --- 해당 제품군에 속한 제품(Products) 리스트 --- */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-10">
                                {item.kind.map((product, idx) => (
                                    <ProductCard key={product.id} product={product} from={from} id={product.id}/>
                                ))}
                            </div>
                        </section>
                    ))
                    :<div className='py-40 text-center flex flex-col gap-4 items-center'>
                        <p className='text-gray-400 text-base md:text-xl font-menium'>선택한 조건에 맞는 제품이 없습니다.</p>
                        <button onClick={() => setSelectedFilters(PRODUCT_TYPES.map(item => item.name))}
                                className='text-gray-400 underline text-sm md:text-base font-bold cursor-pointer'
                        >
                            필터 초기화
                        </button>
                    </div>
                }
            </Container>
        </section>
    )
}
