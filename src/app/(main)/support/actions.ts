'use server' // 서버에서만 실행될 것을 선언

import { Resend } from "resend";

import { INQUIRY_TYPES, InquiryTypeCode } from "@/constants/inquiryType";

export async function sendInquiry(formData: FormData) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. 폼 데이터 추출
    const type= formData.get('inquiryType') as string;
    const displayType = INQUIRY_TYPES[type as InquiryTypeCode] || type;
    
    // const product= formData.get('targetProduct') as string;
    const company= formData.get('company') as string;
    const department = formData.get('department') as string;
    const name= formData.get('name') as string;
    const position = formData.get('position') as string;
    const email= formData.get('email') as string;
    const phone= formData.get('phone') as string;
    const content= formData.get('content') as string;

    const infoRows = [
        { label: '문의 유형', value: displayType},
        { label: '회사명', value: company },
        { label: '부서', value: department },
        { label: '성함', value: name },
        { label: '직책', value: position },
        { label: '이메일', value: email },
        { label: '연락처', value: phone },
    ].filter(row => row.value); // 값이 있는것만 골라냄

    try{
        const {data, error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: `${process.env.EMAIL_ADDRESS}`,
            subject: `[신규 문의]${company} - ${name}님의 문의입니다.`,
            html:`
                <h2>신규문의 상세내용<h2>
                ${infoRows.map(item => `<p><strong>${item.label}:</strong> ${item.value}</p>`).join('')}
                <hr />
                <p><strong>문의내용:</strong></p>
                <p style='white-space: pre-wrap'>${content}</p>
            `

        });

        if (error) {
            return {success: false, message: error.message};
        }

        return {success: true, message: '문의가 성공적으로 전송되었습니다.'};
    } catch {
        return {success: false, message: '알 수 없는 오류가 발생했습니다.'}
    }

    return {success: true, message: '문의가 접수되었습니다.'}; // 요청 성공했다고 가정
}