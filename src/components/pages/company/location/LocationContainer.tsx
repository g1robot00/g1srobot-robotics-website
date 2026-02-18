'use client'

import React from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

import { SECTION_PY } from '@/constants/styles'
import Container from '@/components/shared/Container'
import IconRenderer from '@/components/ui/IconRenderer'
import { LocationDTO } from '@/types/respDto'

// if (typeof window !== "undefined") {
//   const script = document.createElement("script");
//   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
//   script.async = true;
//   document.head.appendChild(script);
// }

export default function LocationContainer({contact}: {contact: LocationDTO}) {
    const contacts = [ contact.address, contact.email, contact.phone]
    const {lat, lng} = contact.address;
    const [ loading, error ] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string, // 환경 변수
        libraries: ['services', 'clusterer'],
    })
    

    if (loading) return <div className="h-[450px] bg-gray-100 flex items-center justify-center">지도를 불러오는 중...</div>;
    if (error) {
        console.error("카카오맵 로드 에러 상세:", error);
        return <div className="h-[450px] bg-red-50 flex items-center justify-center text-red-500">지도를 불러오지 못했습니다. API 키나 도메인 설정을 확인하세요.</div>;
    } 
    return (
        <Container className={`${SECTION_PY.base} grid grid-cols-2`}>
            <div className='flex flex-col gap-10 justify-center'>
                <h2 className='font-black text-3xl'>지원에스로봇</h2>
                {contacts.map(item => (
                    <div key={item.value} className='flex gap-3 items-center'>
                        <span className='p-3 rounded-full bg-main/20 text-main'>
                            <IconRenderer iconName={item.iconName} />
                        </span>
                        <span className='text-lg text-gray-800 tracing-tight '>{item.value}</span>
                    </div>
                ))}
            </div>
            <div className='w-full h-[450px] shadow-lg'>
                {typeof window !== "undefined" && window.kakao
                    ?<Map center={{lat: lat, lng: lng}}
                        style = {{width: '100%', height: '100%'}}
                        level={3}
                    >
                        <MapMarker position={{ lat: lat, lng: lng }}>
                            {/* 마커 위에 띄울 정보 (선택 사항) */}
                            <div className="p-2 text-sm font-bold">G1sRobot 본사</div>
                        </MapMarker>
                    </Map>
                    : <div className='h-full bg-gray-200 flex items-center justify-center text-gray-400'>
                        지도 정보를 로드 중입니다...
                    </div>
                }
            </div>
        </Container>
    )
}
