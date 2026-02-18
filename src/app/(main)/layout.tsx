import React from 'react'
import Script from 'next/script';

import Nav from "@/components/shared/nav/Nav";
import Footer from "@/components/shared/footer/Footer";
import FloatingActions from '@/components/shared/FloatingActions';


export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
        {/* <Script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer`} 
                strategy="beforeInteractive"
        /> */}
        <Nav />
        {children}
        <FloatingActions />
        <Footer />
    </div>
  )
}
