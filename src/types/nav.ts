// 메인 네브바
export interface NavItem {
    readonly label: string;
    readonly href: string;
    //   readonly heroTitle: string; // heroTitle도 쓰신다고 했으니 추가
    readonly heroBg: string;
    readonly items?: readonly {
        readonly label: string;
        readonly href: string;
        readonly heroBg: string;
        // readonly heroTitle: string;
    }[];
}

// heroData
export type HeroData= Pick<NavItem, 'label' | 'heroBg'>;

// 서브탭
export interface SubtabItem {
    readonly label: string;
    readonly id: string;
} 

export interface SubCategoryTabProps {
    list: SubtabItem[];
}