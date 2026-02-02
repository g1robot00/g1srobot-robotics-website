import React from 'react'
import Link from 'next/link'

interface NavItemProps {
    href: string;
    children: React.ReactNode; //<NavItem>과 </NavItem> 사이 내용
}

export default function NavItem({href, children} : NavItemProps) {
    return (
        <li className='p-3'>
            <Link href={href} className='font-bold text-gray-700 hover:text-main hover:cursor-pointer block'>
                {children}
            </Link>
        </li>
    )
}