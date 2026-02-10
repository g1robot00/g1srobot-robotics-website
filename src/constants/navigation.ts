import { NavItem } from "@/types/nav";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: '제품 및 서비스', href: '/products', heroBg: '/img/robot_conveyor.jpg' },
  { label: '산업별 솔루션', href: '/solutions', heroBg: '/img/robot_conveyor.jpg' },
  { label: '적용 사례', href: '/use-cases', heroBg: '/img/robot_conveyor.jpg' },
  { label: '기술 자료', href: '/tech-doc', heroBg: '/img/robot_conveyor.jpg' },
  { label: '회사 소개', 
    href: '/company', 
    heroBg: '/img/robot_conveyor.jpg',
    items: [
      { label: '기업 정보', href: '/company', heroBg: '/img/robot_conveyor.jpg' },
      { label: '오시는 길', href: '/company/location', heroBg: '/img/robot_conveyor.jpg' }, 
      { label: 'Contact Us', href: '/support', heroBg: '/img/robot_conveyor.jpg' }
    ] 
  },
] as const;

export const NAV_HEIGHT = {base: '15', md: '20'}