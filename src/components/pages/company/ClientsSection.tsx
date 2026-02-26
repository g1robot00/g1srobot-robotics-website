import Image from 'next/image'

import Container from '@/components/shared/Container';
import SectionHeader from '../main/SectionHeader'
import { ClientsDTO } from '@/types/respDto';
import { SubtabItem } from '@/types/nav';

interface ClientsSectionProps {
    clients: ClientsDTO[]
    id: string
}

export default function ClientsSection({clients, id}: ClientsSectionProps) {
    return (
        <section id={id} className='w-full h-full lg:h-screen bg-black text-white py-20 md:py-30  croll-mt-[120px]' >
            <Container>
                <SectionHeader category='Our Clients'
                                title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                theme= 'dark'
                />
                    <div className='grid gap-x-5 gap-y-10 md:gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center'>
                        {[...clients, ...clients, ...clients, ...clients, ...clients].map((item, idx) => (
                            <div key={idx} className='h-10 md:h-20 opacity-90'>
                                <Image src={item.logo} alt={item.name} width={130} height={50}/>
                            </div>
                        ))}
                    </div>
            </Container>
        </section>
    )
}
