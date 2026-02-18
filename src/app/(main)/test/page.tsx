'use client'

import React from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

export default function page() {
    const [ loading, error ] = useKakaoLoader({
        appkey: "79796eb7c5ed0a2e365dfc0dc6c5a496", //process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string, // 환경 변수
        libraries: ['services', 'clusterer'],
    })
    

    if (loading) return <div className="h-[450px] bg-gray-100 flex items-center justify-center">지도를 불러오는 중...</div>;
    if (error) {
        console.error("카카오맵 로드 에러 상세:", error);
        return <div className="h-[450px] bg-red-50 flex items-center justify-center text-red-500">지도를 불러오지 못했습니다. API 키나 도메인 설정을 확인하세요.</div>;
    } 
  return (
    <div className='h-[500px] w-full'>
        <Map center={{lat: 35.1956, lng: 128.9565}}
            style = {{width: '100%', height: '100%'}}
            level={3}
        >
            <MapMarker position={{ lat: 128.9565, lng: 128.9565 }}>
                {/* 마커 위에 띄울 정보 (선택 사항) */}
                <div className="p-2 text-sm font-bold">G1sRobot 본사</div>
            </MapMarker>
        </Map>
    </div>
  )
}
