import React from 'react'

import Nav from "@/components/shared/nav/Nav";
import Footer from "@/components/shared/footer/Footer";
import FloatingActions from '@/components/shared/FloatingActions';

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Nav noTransparent/>
      {children}
      <FloatingActions />
      <Footer />
    </div>
  )
}
