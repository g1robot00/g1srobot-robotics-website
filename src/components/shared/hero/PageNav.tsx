import Link from 'next/link'

import { cn } from '@/lib/utils'
import NavDropbar from './NavDropbar'
import { House } from 'lucide-react'

export default function PageNav() {
  return (
    <div className='absolute bottom-5 md:bottom-10 flex gap-3 z-50'>
      <Link href='/' 
            className={cn('flex items-center justify-center', 
                      'py-2 px-3 bg-black/40 backdrop-blur-md',
                      'rounded-full cursor-pointer hover:bg-black/60 transition-all')}
      >
        <House className='w-5 h-5'/>
      </Link>
      <NavDropbar />
    </div>
  )
}
