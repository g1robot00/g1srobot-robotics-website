// 공통 및 하위타입
export interface ProductSpec {
    label: string;
    value: string;
    unit?: string;
}

export interface ProductItemDTO {
    id: string;
    type: 'system' | 'robot' | 'component';
    label: string;
    nameEn: string;
    href: string;
    specs: ProductSpec[];
    thumbnail: string;
}

export type ProductItemSimpleDTO = Omit<ProductItemDTO, 'specs' | 'thumbnail'>;

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
    nameEn: string;
    href: string;
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
export interface ProductLineBase {
    id: string;
    label: string;
    href: string;
    content: string;
    thumbnail: string;
}

export interface ProductLineListDTO extends ProductLineBase{
    kind: ProductItemSimpleDTO[];
}

export interface ProductLineProductsDTO extends ProductLineBase{   //ProductLineProductsDTO
    kind: ProductItemDTO[];
}

export interface DetailNavDTO {
    id: string;
    name: string;
    products: {
        id: string;
        name: string;
        href: string;
    }[];
}

// 산업별
export interface IndustryListDTO {
    label: string;
    slug: string;
    icon: string;
}

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

// 기술자료
export interface techDocDTO {
    id: string;
    title: string;
    fileUrl: string;       
    fileName?: string;
    fileSize?: number;
}

// 회사소개
export interface SloganItem {
    kr: string; //whitespace-pre-wrap 데이터 뛰어쓰기 반영
    en: string;
}

export interface ClientsItem {
    name: string;
    logo: string;
}

export interface HistoryItem {
    id: string; 
    year: string;
    events: {
        content: string;
        month: string;
    }[];
}

export interface CompanyDTO {
    id: string;
    slogan: SloganItem;
    about: string;
    business: string[];
    vision: string;
    clients: ClientsItem[];
    history: HistoryItem[] 
}

// 연락수단
export interface ContactItem {
    value: string;
    iconName: string;
}

interface LocationItem extends ContactItem{
    link: string;
    lat: number;
    lng: number;
}

export interface ContactDTO {
    phone: ContactItem;
    email: ContactItem;
    address: ContactItem;
}

// 오시는 길
export interface LocationDTO{
    phone: ContactItem;
    email: ContactItem;
    address: LocationItem;
}