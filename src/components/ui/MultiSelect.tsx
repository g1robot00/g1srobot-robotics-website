import { useState, useRef, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { TechDocPageDTO } from '@/types/respDto'
import { ChevronDown, Check } from 'lucide-react'

// 📍 variant별로 props를 분리한 discriminated union
type MultiSelectProps = 
    | {
        variant: 'category'
        options: { id: string; name: string; isEmpty: boolean }[]  
        groupedOptions?: never                  
        label: string
        selectedIds: string[]
        onToggle: (id: string) => void
    }
    | {
        variant: 'grouped'
        groupedOptions: TechDocPageDTO['productOptions']  
        options?: never                  
        label: string
        selectedIds: string[]
        onToggle: (id: string) => void
    }

export default function MultiSelect({ 
    label, 
    selectedIds, 
    onToggle, 
    options,
    groupedOptions,
    variant = 'category'
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 외부 클릭시 닫기
    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        window.addEventListener('mousedown', handleOutside);
        return () => window.removeEventListener('mousedown', handleOutside);
    }, []);

    // 드롭다운 열리면 body 스크롤 잠금
    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
}, [isOpen]);

    const renderItem = (id: string, name: string, disabled?: boolean) => {
        const isChecked = selectedIds.includes(id);
            return (
                <div key={id}
                    onClick={() => !disabled && onToggle(id)}
                    className={cn('flex items-center gap-3 p-2.5 rounded-lg transition-colors',
                                    disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
                    )}
                >
                    <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-all flex-shrink-0",
                        isChecked ? "bg-main border-main text-white" : "border-gray-300 bg-white"
                    )}>
                        {isChecked && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={cn("text-sm", isChecked ? "text-gray-900 font-bold" : "text-gray-600")}>
                        {name}
                    </span>
                </div>
            )
    }

    return (
        <div className='relative w-full md:w-64 lg:w-80' ref={containerRef}>
            <button onClick={() => setIsOpen(!isOpen)}
                className={cn('w-full p-3 bg-white border border-gray-200 rounded-lg hover:border-main transition-all cursor-pointer',
                                'flex items-center justify-between  text-sm font-medium')}
            >
                <span className='truncate'>
                    {selectedIds.length > 0
                        ? `${label} (${selectedIds.length})`
                        : `${label} 선택`
                    }
                </span>
                <ChevronDown size={16} className={cn('transition-transform', isOpen && 'rotate-180')} />
            </button>

            {isOpen && (
                <div className={cn('absolute top-full left-0 z-50',
                                'w-full max-h-60 mt-2 p-2 bg-white border border-gray-100 rounded-xl shadow-2xl',
                                'overflow-y-auto animate-in fade-in slide-in-from-top-2')} //FIXME 애니메이션 framer 사용하기
                >
                    {variant  === 'category' && options?.map(item => renderItem(item.id, item.name, item.isEmpty))}
                    {variant === 'grouped' && groupedOptions?.map(group => (
                        <div key={group.label}>
                            <p className='px-2.5 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider'>
                                {group.label}
                            </p>
                            {group.items.map(item => renderItem(item.id, item.name))}
                            <div className='my-1 border-t border-gray-100' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
