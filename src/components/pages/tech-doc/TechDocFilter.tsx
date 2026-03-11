import React from 'react'
import { Funnel } from 'lucide-react'

export default function TechDocFilter() {
    return (
        <div className='flex items-center gap-5'>
            <Funnel />
            <button className='font-bold text-xl cursor-pointer'>전체</button>
            <span>|</span>
        </div>
    )
}
