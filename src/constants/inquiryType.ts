export const INQUIRY_TYPES = {
    'inquiry': {label: '구매문의'},
    'tech': {label: '기술지원'},
} as const;

export type InquiryTypeCode = keyof typeof INQUIRY_TYPES; 