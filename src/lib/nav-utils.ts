import { NAV_ITEMS } from "@/constants/navigation";

export function getHeroDataByPath(pathname: string) {
    const allItems = NAV_ITEMS.flatMap(item => item.items ? [item, ...item.items] : [item]);
    const currentItem = allItems.find(item => item.href === pathname) 
                        || {label: 'G1sRobot', heroBg: '@/img/default.jpg'};

}