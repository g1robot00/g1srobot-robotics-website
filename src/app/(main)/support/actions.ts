'use server' // 서버에서만 실행될 것을 선언

export async function sendInquiry(formData: FormData) {
    // 1. 데이터 꺼내기
    const data = {
        type: formData.get('type'),
        company: formData.get('company'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        content: formData.get('content'),
    }

    console.log('서버에서 받은 데이터: ', data);

    // 2. ResendAPI 호출하거나 Sanity에 저장하는 로직 작성
    return {success: true, message: '문의가 접수되었습니다.'}; // 요청 성공했다고 가정
}