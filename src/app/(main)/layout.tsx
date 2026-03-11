import React from 'react'

import Nav from "@/components/shared/nav/Nav";
import Footer from "@/components/shared/footer/Footer";
import FloatingActions from '@/components/shared/FloatingActions';

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col min-h-screen relative'>
        <Nav />
        <main className='flex-1 relative'>
          {children}
        </main>
        <FloatingActions />
        <Footer />
    </div>
  )
}
