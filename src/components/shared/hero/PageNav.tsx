import Link from 'next/link'

import NavDropbar from './NavDropbar'
import { House } from 'lucide-react'

export default function PageNav() {
  return (
    <div className='absolute bottom-5 md:bottom-10 flex gap-3 z-50'>
      <Link href='/' 
            className={'flex items-center justify-center p-2'
                      + ' bg-black/40 backdrop-blur-md'
                      + ' rounded-full cursor-pointer hover:bg-black/60 transition-all'}
      >
        <House size={20}/>
      </Link>
      <NavDropbar />
    </div>
  )
}
