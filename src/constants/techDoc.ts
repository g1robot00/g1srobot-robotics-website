export const CATEGORY_MAP: MapType = {
    'technical-data': {label: '기술자료', color: 'bg-main/20 text-main'},
    'catalog': {label: '카탈로그', color: 'bg-orange-500/20 text-orange-500'},
    'manual': {label: '사용설명서', color: 'bg-blue-500/20 text-blue-500'},
    'etc': {label: '기타', color: 'bg-gray-500/20 text-gray-500'},
} as const;
// FIXME ProductCard.tsx > typeConfig 상수로 보내고 타입이 같음

interface MapType {
    [key: string]: {
        label: string
        color: string
    }
}

export const LANGUAGE_MAP: Record<string, string> = {
    'ko': '한국어',
    'en': '영어'
}
