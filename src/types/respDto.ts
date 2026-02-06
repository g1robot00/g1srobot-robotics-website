// 공통 및 하위타입
export interface ProductSpec {
    label: string;
    value: string;
    unit?: string; // 단위는 없을 수도 있으니 ? 추가
}

export interface ProductItemDTO {
    id: string;
    type: 'system' | 'robot' | 'component';
    label: string;
    href: string;
    specs: ProductSpec[]; // 위에서 정의한 타입 재사용
    thumbnail: string;
}

export interface RelatedItem {
    name: string;
}

export interface RelatedProductDTO {
    id: string;
    name: string;
    mainImage: string;
    href: string;
}

// 제품
export interface ProductDTO {
    id: string;
    label: string;
    slug: string;
    specs: ProductSpec[];
    description: string;
    productLine: RelatedItem;
    industries: RelatedItem[];
}

// 제품상세(시스템, 로봇, 부품)
export interface UniversalDetailDTO {
    id: string;
    type: 'system' | 'robot' | 'component';
    name: string;
    description: string;
    specs: ProductSpec[]
    productLine: string;
    industries: string[];
    mainImage: string;
    images: string[];
    videos: string[],
    robots?: RelatedProductDTO[];
    components?: RelatedProductDTO[];
}

// 제품군
export interface ProductLineDTO {
    id: string,
    label: string;
    content: string;
    href: string;
    kind: ProductItemDTO[],
    productImg: string;
}

// 산업별
export interface IndustryProductsDTO {
    id: string;
    label: string;
    kind: ProductItemDTO[];
}

// 적용 사례
export interface UseCaseDTO {
    title: string;
    slug: string;
    href: string;
    sum: string;
    date: string;
    thumbnail?: string; // 이미지를 추가했을 경우
    products: RelatedItem[];
    industries: RelatedItem[];
}

export interface IndustryListDTO {
    label: string;
    slug: string;
    icon: string;
}

// 기술자료
export interface techDocDTO {
    id: string;
    title: string;
    fileUrl: string;       
    fileName?: string;
    fileSize?: number;
}