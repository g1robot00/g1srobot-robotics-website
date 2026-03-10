// 공통 및 하위타입
export interface ProductSpec {
    _key: string;
    label: string;
    value: string;
    unit?: string;
}

export interface ProductItemDTO {
    id: string;
    type: 'system' | 'robot';
    label: string;
    href: string;
    specs: ProductSpec[];
    thumbnail: string;
}

export type ProductItemSimpleDTO = Omit<ProductItemDTO, 'specs' | 'thumbnail'>;

export interface BaseItem {
    id: string;
    name: string;
}

export interface LinkedItem extends BaseItem {
    href: string;
}

export interface RelatedProductDTO extends LinkedItem{
    mainImage: string;
}


// 제품상세(시스템, 로봇, 부품)
export interface UniversalDetailDTO {
    id: string;
    type: 'system' | 'robot' | 'component';
    name: string;
    nameEn: string;
    href: string;
    description: string;
    specs: ProductSpec[];
    specsImg: string;
    productLine?: string;
    industries?: string[];
    images: string[];
    videos: string[],
    robots?: RelatedProductDTO[];
    components?: RelatedProductDTO[];
}

// 제품군
export interface ProductLineBase {
    id: string;
    label: string;
    nameEn: string;
    href: string;
    content: string;
    thumbnail: string;
}


export interface ProductLineProductsDTO extends ProductLineBase{ //부품 삭제 ㅇㅇ
    kind: ProductItemDTO[];
}

export interface DetailNavDTO {
    id: string;
    name: string;
    products: LinkedItem[];
}

// 산업별
export interface IndustryProductsDTO {
    id: string;
    label: string;
    nameEn: string;
    kind: ProductItemDTO[];
}

// 적용 사례
export interface UseCaseDTO {
    id: string;
    title: string;
    description: string;
    date: string;
    systems: LinkedItem[];
    industries: BaseItem[];
    thumbnail?: string;
    images?: string;
    videos?: string;
}

export interface UseCasePageDTO {
    useCases: UseCaseDTO[];
    industryFilters: BaseItem[];
    systemFilters: BaseItem[];
}

//랜딩페이지 
export interface IndustryListDTO {
    id: string;
    label: string;
    href: string;
    icon: string;
}

export interface ProductLineListDTO extends ProductLineBase{
    hasProducts: boolean;
}

// 고객사 로고
export interface ClientsDTO {
    name: string;
    logo: string
}

export interface LandingPageDTO {
    industries: IndustryListDTO[];
    productLines: ProductLineListDTO[];
    useCases: UseCaseDTO[];
    clients: ClientsDTO[];
}

// 기술자료
export interface TechDocDTO {
    id: string;
    title: string;
    category: string;
    language: string;
    releaseDate: string;
    files: {
        key: string;
        url: string;
        name: string;
        size: string;
        extention: string;
    }[];
    relatedProducts: BaseItem[];
}


// 회사소개
export interface SloganItem {
    kr: string; //whitespace-pre-wrap 데이터 뛰어쓰기 반영
    en: string;
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
    clients: ClientsDTO[];
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

