import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { UseCaseDTO } from '@/types/respDto'
import Badge from '@/components/ui/Badge'

interface UseCaseCardProps {
  useCase: UseCaseDTO
}

export default function UseCaseCard({useCase}: UseCaseCardProps) {
   const { title, sum, date, products, industries, href, thumbnail } = useCase; // 구조분해 할당
  return (
    <Link href={href} className='group col-span-1 rounded-xl shadow-md overflow-hidden cursor-pointer'>
      <div className='relative w-full h-72 overflow-hidden'>
        {thumbnail
          ?<Image src={thumbnail} alt={title} fill
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
              sizes="(max-width: 768px) 100vw, 33vw" // 성능 최적화
          />
          : <div className="w-full h-full bg-gray-200" />
        }
        <div className='absolute top-3 left-3 z-20 flex flex-wrap gap-1'>
            {industries?.map((i) => (
              <Badge 
                key={i.name}
                label={i.name}
                variant="filled"
              />
            ))}
        </div>

        {/* 호버시 나타나는 검정레이어 */}
        <div className='absolute inset-0 z-10 bg-black/70 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300
                        flex flex-col justify-end p-5 text-white'
        >
          <p className='text-sm line-clamp-3 leading-relaxed text-white/80'>
            {sum}
          </p>
          <div className='flex flex-wrap  gap-x-3 gap-y-1 border-t border-white/20 pt-3'>
            {products?.map((p) => (
              <Badge
                key={p.name}
                label={p.name}
                variant="outline"
                prefix="#"
              />
            ))}
          </div>
        </div>
      </div>

      <div className='px-3 py-5'>
        <h3 className='text-lg md:text-xl font-bold group-hover:text-main transition-colors'>{title}</h3>
        <p className='text-gray-400 text-xs md:text-sm'>{date}</p>
      </div>
    </Link>
  )
}
