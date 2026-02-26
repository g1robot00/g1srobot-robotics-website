export const INQUIRY_TYPES: Record<string, string> = {
    'inquiry': '구매문의',
    'tech': '기술지원',
} as const;

export type InquiryTypeCode = keyof typeof INQUIRY_TYPES; 