import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'

import { cn } from '@/lib/utils'
import { CONTACT_QUERY } from '@/lib/queries'
import { NAV_ITEMS } from '@/constants/navigation'
import Container from '../Container'
import ContactItem from './ContactItem'
import { ContactDTO } from '@/types/respDto'

export default async function Footer() {
  const contacts: ContactDTO = await client.fetch(CONTACT_QUERY);
  const allContacts = [
    {id: 'email', ...contacts.email}, 
    {id: 'phone', ...contacts.phone}, 
    {id: 'address', ...contacts.address}];

  return (
    <footer className={cn('bg-black')}
    >
        <Container className='md:h-100 py-8 md:py-16 grid grid-cols-1 gap-5 lg:gap-10 md:grid-cols-2 text-white/80'>
          <div className='flex flex-col gap-9 md:justify-between'>
            <div className='w-[200px] md:w-[250px] lg:w-[300px]'>
              <Image className="dark:invert"
                      src="/img/logo/g1srobot_Logo_main.svg"
                      alt="g1srobot logo"
                      width={300}
                      height={20}
                      priority
              />
            </div>
            <div className='flex flex-col gap-3 md:gap-8'>
              {allContacts.map(item => (
                <ContactItem key={item.id} info={item} />
              ))}
            </div>
          </div>
          <div className='flex flex-col md:items-end justify-between'>
              <div className='hidden md:flex gap-5 lg:gap-8'>
                {NAV_ITEMS.map((item,idx) => (
                  <Link key={`${idx}_${item.label}`}
                        href={item.href} className='font-bold max-h-[3rem]'
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className='flex flex-col gap-2 md:items-end text-xs md:text-base md:text-right'>
                <span className='text-main'>개인정보처리방침</span>
                <span>@Copyright 2026 G1SRobot, All Rights Reserved</span>
              </div>
          </div>
        </Container>
    </footer>
  )
}
