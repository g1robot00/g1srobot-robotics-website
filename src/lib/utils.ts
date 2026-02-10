import { clsx, type ClassValue } from "clsx"
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (value: string) => {
    if (!value) return value;

    //숫자만 남기기
    const phoneNum = value.replace(/[^\d]/g, '');    // 숫자만 남기기
    const phoneNumLength = phoneNum.length;

    // 02-0000-0000
    if (phoneNum.startsWith('02')) {
        if ( phoneNumLength < 3) return phoneNum;
        if ( phoneNumLength < 6) return `${phoneNum.slice(0,2)}-${phoneNum.slice(2)}`;
        if ( phoneNumLength < 10) return `${phoneNum.slice(0,2)}-${phoneNum.slice(2, 5)}-${phoneNum.slice(5)}`;
        return `${phoneNum.slice(0,2)}-${phoneNum.slice(2, 6)}-${phoneNum.slice(6, 10)}`;
    }

    // 000-000-0000 형태 
    if (phoneNumLength < 4) return phoneNum;
    if (phoneNumLength < 7) return `${phoneNum.slice(0, 3)}-${phoneNum.slice(3)}`;
    if (phoneNumLength < 11) return `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 6)}-${phoneNum.slice(6)}`;
    // 000-0000-0000 형태
    return `${phoneNum.slice(0,3)}-${phoneNum.slice(3, 7)}-${phoneNum.slice(7, 11)}`;
}