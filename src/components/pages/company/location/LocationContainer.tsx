'use client'

import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

import { SECTION_PY } from '@/constants/styles'
import Container from '@/components/shared/Container'
import { LocationDTO } from '@/types/respDto'
import { ArrowUpRight } from 'lucide-react'


// if (typeof window !== "undefined") {
//   const script = document.createElement("script");
//   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
//   script.async = true;
//   document.head.appendChild(script);
// }

export default function LocationContainer({ contact }: { contact: LocationDTO }) {
    const contacts = [
        {nameEn: 'Address.', value: contact.address},
        {nameEn: 'Tel.', value: contact.phone},
        {nameEn: 'Email.', value: contact.email},
    ];

    const { lat, lng, link } = contact.address;
    const [loading, error] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string, // 환경 변수
        libraries: ['services', 'clusterer'],
    })


    if (loading) return <div className="h-[450px] bg-gray-100 flex items-center justify-center">지도를 불러오는 중...</div>;
    if (error) {
        console.error("[KakaoMap] Failed to load SDK:", error);
        return <div className="h-[450px] bg-red-50 flex items-center justify-center text-red-500">지도를 불러오지 못했습니다. </div>;
    }

    return (
        <Container className={`${SECTION_PY.base} grid gap-7 grid-cols-1 md:grid-cols-2 `}>
            {/* <div className='py-10 px-5 md:px-10 lg:px-20 border border-gray-300 rounded-2xl '> */}
                <div className='flex flex-col gap-10 justify-center'>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-black text-3xl'>지원에스로봇</h2>
                        <a
                            href={`https://map.kakao.com/link/to/G1sRobot,${lat},${lng}`}
                            target="_blank"
                            rel="noreferrer"
                            className="h-fit px-4 py-2 bg-main/20 flex items-center text-main text-xs rounded-lg font-bold"
                        >
                            길찾기<ArrowUpRight size={13}/>
                        </a>
                    </div>
                    <div className='flex flex-col gap-6 '>
                        {contacts.map(item => (
                            <div key={item.nameEn} className='grid grid-cols-[120px_1fr]'>
                                <span className='font-bold'>
                                    {item.nameEn}
                                    {/* <IconRenderer iconName={item.iconName} /> */}
                                </span>
                                <span className='text-lg text-gray-800 tracing-tight '>{item.value.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-[450px] shadow-lg rounded-2xl overflow-hidden'>
                    {typeof window !== "undefined" && window.kakao
                        ? <Map center={{ lat: lat, lng: lng }}
                            style={{ width: '100%', height: '100%' }}
                            level={3}
                        >
                            <MapMarker position={{ lat: lat, lng: lng }}>
                                <div className="p-2 min-w-[150px]">
                                    <div className="font-bold text-sm mb-1">G1sRobot 본사</div>
                                    <a
                                        href={`https://map.kakao.com/link/to/G1sRobot,${lat},${lng}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-blue-500 hover:underline"
                                    >
                                        큰 지도로 보기 / 길찾기
                                    </a>
                                </div>
                            </MapMarker>
                        </Map>
                        : <div className='h-full bg-gray-200 flex items-center justify-center text-gray-400'>
                            지도 정보를 로드 중입니다...
                        </div>
                    }
                </div>
            {/* </div> */}
        </Container>
    )
}
