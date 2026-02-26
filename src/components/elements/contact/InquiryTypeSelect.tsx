import { forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { INQUIRY_TYPES } from '@/constants/inquiryType'
import { INPUT_STYLE } from '@/constants/styles'
import { ChevronDown } from 'lucide-react'

interface InquiryTypeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const InquiryTypeSelect = forwardRef<HTMLSelectElement, InquiryTypeSelectProps>((props, ref) => {
    return (
        <div className='relative'>
            <select name='inquiryType'
                    ref={ref}
                    {...props}
                    className={cn(`${INPUT_STYLE.input} w-full appearance-none cursor-pointer`, props.className)} 
            >
                <option value='' disabled>문의유형을 선택해주세요.</option>
                {Object.entries(INQUIRY_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>{INQUIRY_TYPES[key]}</option>
                    
                ))}
            </select>
            <ChevronDown className="absolute z-1 right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
        </div>
    )
})

InquiryTypeSelect.displayName = "InquiryTypeSelect";
export default InquiryTypeSelect;