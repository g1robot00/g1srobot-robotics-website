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

    return (
        <div className='border-y border-gray-200 devide-y divide-gray-200'>
            <div className='w-full border-b border-gray-200 '>
                {defaultProductName 
                ? 
                <Input label='관심 제품'
                        name='targetProduct'
                        value={defaultProductName}
                        readOnly
                        className='bg-gray-50 font-bold opacity-70'
                />
                
                : 
                <FormField label="문의유형" required>
                    <InquiryTypeSelect ref={inquiryTypeRef}
                                        defaultValue={defaultProductName ? 'inquiry': ''}
                    />
                </FormField>
                }
            </div>


            <Input name='company'
                ref={companyRef}
                label="회사명"
                required
                placeholder='회사명을 입력해주세요'
            />
            <Input name='name' 
                    ref={nameRef}
                    label="이름" 
                    required 
                    placeholder='이름을 입력해주세요' />

            <EmailField ref={emailRef}/>

            <Input name='phone' 
                    ref={phoneRef}
                    label="전화번호" 
                    type="tel" 
                    required 
                    placeholder='전화번호를 입력해주세요' />
            <Input name='content'
                ref={contentRef}
                label="문의사항"
                required
                isTextArea
                placeholder='문의내용을 입력해주세요' 
                defaultValue={defaultProductName ? `${defaultProductName} 제품 견적 및 사양 문의드립니다.` : ''}
            />
        </div>
    )
}
