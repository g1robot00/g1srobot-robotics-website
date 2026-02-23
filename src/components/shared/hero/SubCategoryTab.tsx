'use client'

import { useState, useEffect, useRef } from 'react'

import { cn } from '@/lib/utils';
import { NAV_HEIGHT } from '@/constants/navigation';
import { SubCategoryTabProps } from '@/types/nav';

export default function SubCategoryTab({list}: SubCategoryTabProps) {
  const [ activeId, setActiveId ] = useState(list[0]?.id);
  const [isNavVisible, setIsNavVisible] = useState(true); // 네브바 상태표시
  // const [lastScrollY, setLastScrollY] = useState(0);  // 이전 스크롤 위치
  const lastScrollY = useRef(0); // ✨ lastScrollY를 Ref로 변경 (재렌더링 방지 및 값 동기화)
  const scrollContainerRef = useRef<HTMLDivElement>(null); //스크롤 컨테이너 잡는 ref
  // 수동 스크롤인지 확인하는 변수(<-> 서브탭 눌러서 이동)
  const isManualScrolling = useRef(false); //FIXME 서브탭 선택해서 위로 스크롤 시 네브바 안나오게
  

   // ✅ 1. [초기화 & Scroll Spy] : 어떤 섹션을 보고 있는지 감지
  useEffect(()=>{
    // [랜딩페이지에서 왔을때] 처음 페이지 들어왔을때 주소창 해시가 있는지 확인
    const hash = window.location.hash.replace('#', '');
    if (hash) setActiveId(hash);

    const observerOptions = {
      root: null, // 감시 기준을 화면전체로 잡음
      rootMargin: '-20% 0% -60% 0%',  // 상단 부근에 왔을 때 감지
      threshold: 0, // 타겟 요소가 1픽셀이라도 들어오면 즉시 실행
    };

    const observer = new IntersectionObserver( entries => {  // 이 조건으로 감시하는 감시관
      entries.forEach(entry => {  //감시대상 리스트
        if(entry.isIntersecting) {  // 현재 이 요소가 감지영역에 들어왔는가
          setActiveId(entry.target.id);
        }
      })
    }, observerOptions);

    list.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if(!activeId || !scrollContainerRef.current) return;

    const activeTab = scrollContainerRef.current.querySelector(`[data-tab-id='${activeId}']`);

    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest' //세로 방향은 건드리지 않음
      })
    }
  }, [activeId])
  
   // ✅ 2. [네브바 방향 감지] : 스크롤 위/아래에 따라 탭의 top 위치 조절
  useEffect(() => {
    const updateNavVisibility = () => {
      if (isManualScrolling.current) return;
      const currentScrollY = window.scrollY;

      // 네브바 노출 여부와 동일한 로직
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', updateNavVisibility);
    return () => window.removeEventListener('scroll', updateNavVisibility);
  }, [])


  // ✅ 3. [클릭 이벤트] : 탭 클릭 시 해당 위치로 스무스하게 이동
  const handleManualScroll  = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.dispatchEvent(new CustomEvent('manualScrollLock', { detail: true }));  // ✨ 네브바에게 잠금 신호 전송
      isManualScrolling.current = true;
      setIsNavVisible(false); 

      setActiveId(id);
      element.scrollIntoView({behavior: 'smooth'})
    }

     // 📍 스크롤 애니메이션이 끝날 때쯤(약 0.8초~1초 후) 플래그 OFF
      setTimeout(() => {
        // ✨ 이동이 끝난 후 잠금 해제 신호 전송
      window.dispatchEvent(new CustomEvent('manualScrollLock', { detail: false }));
        // 📍 도착한 지점의 스크롤 값을 lastScrollY에 업데이트해서 오작동 방지
        lastScrollY.current = window.scrollY; 
        isManualScrolling.current = false;
      }, 1000); 
  };
  
  return (
    <div className={cn(`sticky top-0 z-30 w-full transition-all duration-500 bg-gray-200`,  
                    isNavVisible && NAV_HEIGHT.top)}
    >
      {/* 양옆 그라데이션 */}
      <div className="absolute inset-y-0 left-0 top-0 bottom-0 w-10 md:w-20 z-40 bg-gradient-to-r from-gray-200 to-transparent pointer-events-none " />
      <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 z-40 bg-gradient-to-l from-gray-200 to-transparent pointer-events-none " />
      {/* 스크롤 영역 */}
      <div ref={scrollContainerRef} className='relative z-10 w-full flex overflow-x-auto scrollbar-hide '>
        <div className={cn('flex items-center gap-6 md:gap-10 md:min-w-full ', NAV_HEIGHT.h, 'px-8 md:px-20', 'justify-start md:justify-center')}>
          {list.map(item => (
            <button key={item.id}
                    data-tab-id={item.id}
                  onClick={() => handleManualScroll(item.id)}
                  className={`text-base md:text-lg font-bold transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap
                            ${activeId === item.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
