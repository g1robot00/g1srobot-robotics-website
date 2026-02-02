import { useState, forwardRef } from "react"

import { INPUT_STYLE } from '@/constants/styles'
import FormField from "@/components/ui/FormField"
import { ChevronDown } from 'lucide-react'

const EmailField = forwardRef<HTMLInputElement>((props, ref) => {
    const [emailDomainOpt, setEmailDomainOpt] = useState<string>('direct');
    const [inputDomain, setInputDomain] = useState<string>('');

    const onDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEmailDomainOpt(value);
        if (value !== 'direct') {
            setInputDomain(value);
        } else {
            setInputDomain('');
        }
    }
    return (
        <FormField label="이메일" 
                required 
                placeholder='이메일을 입력해주세요'
                className='w-full'
        >
            <div className='relative flex gap-2 items-center'>
                <input type='text'
                        ref={ref}
                        name="emailId"
                        className={`${INPUT_STYLE.input} flex-1`} 
                        placeholder='이메일을 입력해주세요' 
                />
                
                <span className='text-gray-500'>@</span>
                
                <input type='text'
                        name="emailDomain"
                        value={inputDomain}
                        onChange={e => setInputDomain(e.target.value.trim())}
                        disabled={emailDomainOpt !== 'direct'}
                        className={`${INPUT_STYLE.input} flex-1`}
                />
                <select value={emailDomainOpt}
                    onChange={e => onDomainChange(e)}
                    className={`${INPUT_STYLE.input} flex-1 appearance-none cursor-pointer`}
                >

                    <option value='direct'>직접 입력</option>
                    <option value='naver.com'>naver.com</option>
                    <option value='gmail.com'>gmail.com</option>
                </select>
                <ChevronDown className="absolute z-1 right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
            </div>
        </FormField>
    )
})

EmailField.displayName = "EmailField";
export default EmailField;
