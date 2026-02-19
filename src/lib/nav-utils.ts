import { NAV_ITEMS } from "@/constants/navigation";
import { HeroData } from "@/types/nav";

export function getHeroDataByPath(pathname: string): HeroData {
    // 현재 경로에 맞는 아이템 찾기 (대분류/소분류 통합 검색)
    const allItems = NAV_ITEMS.flatMap(item => item.items ? [item, ...item.items] : [item]);
    const match = allItems.find(item => item.href === pathname) 
    console.log('함수.히어로 배경: ', match);
    
    return {
        label: match?.label || 'G1sRobot',
        heroBg: match?.heroBg || '/img/default.jpg'
    }
}