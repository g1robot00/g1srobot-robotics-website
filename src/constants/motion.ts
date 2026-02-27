
// 아코디언 형식 _overflow-hidden 필수
export const ACCORDION_VARIANTS = {
    initial:{ height: 0, opacity: 0, y: -5 },
    animate: {height: 'auto', opacity: 1, y: 0},
    exit: { height: 0, opacity: 0, y:-5},
    transition: { duration: 0.3, ease: 'easeInOut' as const },
}