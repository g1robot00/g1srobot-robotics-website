import { NavItem } from "@/types/nav";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: '제품 및 서비스', href: '/products', heroBg: '/img/HeroBg/spotlight1.jpg' },
  { label: '산업별 솔루션', href: '/solutions', heroBg: '/img/HeroBg/abstract_black1.jpg' },
  { label: '적용 사례', href: '/use-cases', heroBg: '/img/HeroBg/abstract_blue1.jpg' },
  { label: '자료실', href: '/tech-doc', heroBg: '/img/HeroBg/techdoc.jpg' },
  { label: '회사 소개', 
    href: '/company', 
    heroBg: '/img/HeroBg/g1s_high1.jpg',
    items: [
      { label: '기업 정보', href: '/company', heroBg: '/img/HeroBg/g1s_high1.jpg' },
      { label: '오시는 길', href: '/company/location', heroBg: '/img/HeroBg/g1s_high1.jpg' }, 
      { label: 'Contact Us', href: '/support', heroBg: '/img/HeroBg/contact1.jpg' }
    ] 
  },
] as const;

