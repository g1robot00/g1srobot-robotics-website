'use client'

import { useState, useEffect } from 'react'

interface SubtabItem {
    readonly label: string;
    readonly id: string;
}

interface SubCategoryTabProps {
  list: SubtabItem[];
}

export default function SubCategoryTab({list}: SubCategoryTabProps) {
  const [ activeId, setActiveId ] = useState(list[0]?.id);

  useEffect(()=>{
    const observerOptions = {
      root: null, // 감시 기준을 화면전체로 잡음
      rootMargin: '-20% 0% -60% 0%',
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
  
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);

      element.scrollIntoView({behavior: 'smooth'})
      // const offset = 100; //헤더높이만큼 여백
      // const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      // const offsetPosition = elementPosition - offset;

      // window.scrollTo({
      //   top: offsetPosition,
      //   behavior: 'smooth'
      // })
    }
  };

  
  return (
    <div className='sticky top-0 z-30
                    h-20 bg-gray-200 px-5 overflow-x-auto scrollbar-hide
                    flex justify-center items-center gap-10'
    >
      {list.map(item => (
        <button key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`text-base md:text-lg font-bold transition-colors cursor-pointer flex-shrink-0
                        ${activeId === item.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
          {item.label}
        </button>
      ))}
    </div>
  )
}
