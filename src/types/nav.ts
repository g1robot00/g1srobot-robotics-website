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
