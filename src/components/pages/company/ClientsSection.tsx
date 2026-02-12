import Image from 'next/image'

import SectionHeader from '../main/SectionHeader'
import { ClientsItem } from '@/types/respDto';

interface ClientsSectionProps {
    clients: ClientsItem[]
}

const PARTNERS = [
    { name: 'Partner 1', logo: '/img/logo_lg.png' }, // 임시로 넥스트 로고 사용
    { name: 'Partner 2', logo: '/img/logo_lg.png' },
    { name: 'Partner 3', logo: '/img/logo_lg.png' },
    { name: 'Partner 4', logo: '/img/logo_lg.png' },
    { name: 'Partner 5', logo: '/img/logo_lg.png' },
    { name: 'Partner 6', logo: '/img/logo_lg.png' },
]

export default function ClientsSection({clients}: ClientsSectionProps) {
    return (
        <section className='w-full h-screen bg-black text-white py-30 '>
            <SectionHeader category='Our Clients' 
                            title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                            theme= 'dark'
            >   
                <div className='grid grid-cols-2 md:grid-cols-5'>
                    {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((item, idx) => (
                        <div key={idx} className='h-5 md:h-20'>
                            <Image src={item.logo} alt={item.name} width={130} height={50}/>
                        </div>
                    ))}
                </div>
            </SectionHeader>
        </section>
    )
}
