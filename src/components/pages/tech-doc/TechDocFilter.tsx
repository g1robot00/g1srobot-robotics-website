import MultiSelect from '@/components/ui/MultiSelect';
import { TechDocPageDTO } from '@/types/respDto';
import { RotateCcw  } from 'lucide-react'

interface TechDocFilterProps {
    categoryOptions: {id: string; name: string; isEmpty: boolean;}[]
    productOptions: TechDocPageDTO['productOptions']
    selectedCategoryIds: string[]
    selectedProductIds: string[]
    onCategoryToggle: (id: string) => void
    onProductToggle: (id: string) => void
    onReset: () => void
}

export default function TechDocFilter({
    categoryOptions, 
    productOptions,
    selectedCategoryIds,
    selectedProductIds,
    onCategoryToggle,
    onProductToggle,
    onReset
}: TechDocFilterProps) {
    const hasFilter = selectedCategoryIds.length > 0 || selectedProductIds.length > 0;
    return (
        <div className='flex items-center gap-4 mb-2 bg-gray-50 p-6 rounded-2xl'>
            <div className='grid grid-cols-1 md:flex gap-4'>
                <MultiSelect
                    label='카테고리'
                    variant='category'
                    options={categoryOptions}
                    selectedIds={selectedCategoryIds}
                    onToggle={onCategoryToggle}
                />
                <MultiSelect
                    label='시스템/로봇'
                    variant='grouped'
                    groupedOptions={productOptions}
                    selectedIds={selectedProductIds}
                    onToggle={onProductToggle}
                />
            </div>
            {hasFilter && (
                <div className='flex items-center gap-2'>
                    {/* <span className='text-sm text-gray-500'>필터 적용 중</span> */}
                    <button
                        onClick={onReset}
                        className='flex items-center gap-0.5 text-sm text-main cursor-pointer hover:underline'
                    >
                        <RotateCcw  size={14} /> 
                        초기화
                    </button>
                </div>
            )}
        </div>
    )
}
