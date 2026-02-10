'use client'
import { useState } from 'react'

import { formatPhoneNumber } from '@/lib/utils'
import FormField from '@/components/ui/FormField'
import InquiryTypeSelect from './InquiryTypeSelect'
import EmailField from './EmailField'
import Input from '@/components/ui/Input'
import { InquiryFormRefs } from '@/types/contact'

interface ContactFormProps {
    refs: InquiryFormRefs
    defaultProductName?: string   //상세페이지에서 주는 제품명
}

export default function ContactForm({ refs, defaultProductName }: ContactFormProps) {
    const {inquiryTypeRef, emailRef, companyRef, nameRef, phoneRef, contentRef} = refs
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setPhone(formattedValue);
    }

    return (
        <div>
            <span className='w-full flex justify-end text-gray-500'><span className='mr-1 text-main text-2xl font-extra-bold '>*</span>필수 입력항목</span>
            <div className='border-y border-gray-200 devide-y divide-gray-200'>
                <div className='w-full border-b border-gray-200 '>
                    {defaultProductName
                    ?<>
                        <input type="hidden" name="inquiryType" value="inquiry" />
                        <Input label='관심 제품'
                                name='targetProduct'
                                value={defaultProductName}
                                readOnly
                                className='bg-gray-50 font-bold opacity-70'
                        />
                    </>
                    :<FormField label="문의유형" required>
                        <InquiryTypeSelect ref={inquiryTypeRef}
                                            defaultValue={defaultProductName ? 'inquiry': ''}
                        />
                    </FormField>
                    }
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                    <Input name='company'
                        ref={companyRef}
                        label="회사명"
                        required
                        placeholder='회사명을 입력해주세요'
                    />
                    <Input name='department'
                            label="부서"
                            placeholder='부서를 입력해주세요'
                    />
                    <Input name='name'
                            ref={nameRef}
                            label="이름"
                            required
                            placeholder='이름을 입력해주세요'
                    />
                    <Input name='position'
                            label="직책"
                            placeholder='직책을 입력해주세요'
                    />
                </div>
                <Input name='phone'
                        ref={phoneRef}
                        value={phone}
                        label="연락처"
                        type="tel"
                        onChange={handlePhoneChange}
                        required
                        placeholder='연락처를 입력해주세요 (숫자만 입력 가능)'
                        maxLength={13}
                        />
                <EmailField ref={emailRef}/>
                <Input name='content'
                        ref={contentRef}
                        label="문의사항"
                        required
                        isTextArea
                        placeholder='문의내용을 입력해주세요(10자 이상)'
                        defaultValue={defaultProductName ? `${defaultProductName} 제품 견적 및 사양 문의드립니다.` : ''}
                />
            </div>
        </div>
    )
}
