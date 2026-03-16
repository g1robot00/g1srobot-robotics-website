import type { Config } from "tailwindcss";

const config: Config = {
    // 테일윈드가 CSS를 생성하기 위해 감시할 파일 경로들입니다.
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // components 폴더 감시
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",       // app 폴더 감시
        "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    ],
    theme: {
        extend: {
            colors: {
                // 기존에 사용하시던 'main' 컬러가 있다면 여기서 정의해야 합니다.
                main: "var(--main)", // 예시 색상입니다. 실제 브랜드 색상 코드로 바꾸세요.
            },
            screens: {
                '3xl': '1720px',
            },
        },
    },
    plugins: [],
};
export default config;

