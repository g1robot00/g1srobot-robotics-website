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
        formData.set('email', `${emailId}@${emailDomain}`);

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
        
        // 이메일 정규식 검사
        const email = formData.get('email') as string;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 형식을 입력해주세요.');
            emailRef.current?.focus();
            return;
        }

        // 전화번호 길이 검사
        const phoneVal = formData.get('phone') as string;
        if (phoneVal.length < 11) {
            alert('전화번호를 정확히 입력해주세요');
            phoneRef.current?.focus();
            return;
        }

        // 문의내용 길이검사
        const content = formData.get('content') as string;
        if (content.trim().length < 10) {
            alert('문의 내용을 10자 이상 작성해주세요.');
            contentRef.current?.focus();
            return;
        }


        if (!isAgreed) {
            alert('개인정보 수집에 동의해주세요.');
            return;
        };

        //ServerAction 호출
        const result = await sendInquiry(formData);
        if(result.success) {
            alert(result.message);
            window.location.reload();   // 성공 후 새로고침
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