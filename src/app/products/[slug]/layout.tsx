import React from 'react'
import ProductDetailNav from '@/components/shared/nav/ProductDetailNav'

export default function layout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex flex-col'>
            <main>
                <ProductDetailNav />
                {children}
            </main>
        </div>
    )
}
