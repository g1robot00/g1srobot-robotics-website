import { useState, useRef } from 'react'

import { sendInquiry } from '@/app/(main)/support/actions' 
import { InquiryFormRefs } from '@/types/contact'


interface UseInquiryFormReturn {
    isAgreed: boolean
    setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>
    formRefs: InquiryFormRefs
    agreeRef: React.RefObject<HTMLInputElement | null>
    handleFormSubmit: (e: React.FormEvent) => Promise<void>
}

export function useInquiryForm(): UseInquiryFormReturn {
    const [isAgreed, setIsAgreed] = useState(false);
    
    const inquiryTypeRef = useRef<HTMLSelectElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const formRefs = { inquiryTypeRef, emailRef, companyRef, nameRef, phoneRef, contentRef };

    const agreeRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const emailId = formData.get('emailId') as string;
        const emailDomain = formData.get('emailDomain') as string;
        const fullEmail = `${emailId}@${emailDomain}`;

        const checkList = [
            { name: 'inquiryType', label: '문의유형', ref: formRefs.inquiryTypeRef },
            { name: 'company', label: '회사명', ref: formRefs.companyRef },
            { name: 'name', label: '이름', ref: formRefs.nameRef },
            { name: 'emailId', label: '이메일', ref: formRefs.emailRef },
            { name: 'phone', label: '전화번호', ref: formRefs.phoneRef },
            { name: 'content', label: '문의내용', ref: formRefs.contentRef },
        ]

        for (const item of checkList) {
            const value = formData.get(item.name) as string;
            if (!value || !value.trim()) {
                alert(`${item.label}을(를) 입력해주세요.`);
                item.ref.current?.focus();
                return;
            }
        };

        if (!isAgreed) {
            alert('개인정보 수집에 동의해주세요.');
            return;
        };

        //ServerAction 호출
        const result = await sendInquiry(formData);
        if(result.success) {
            alert(result.message);
            window.location.reload();   // 성공 후 새로고침
            console.log('제출완료');
        }
    };

    return {
        isAgreed, 
        setIsAgreed, 
        formRefs,
        agreeRef, 
        handleFormSubmit
    };
}