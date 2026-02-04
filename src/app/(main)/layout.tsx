import React from 'react'

import Nav from "@/components/shared/nav/Nav";
import Footer from "@/components/shared/footer/Footer";


export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Nav />
        {children}
        <Footer />
    </div>
  )
}
