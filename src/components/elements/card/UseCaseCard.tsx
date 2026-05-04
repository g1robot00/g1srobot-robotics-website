import Image from 'next/image'

import { cn } from '@/lib/utils'
import { UseCaseDTO } from '@/types/respDto'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Badge from '@/components/ui/Badge'

interface UseCaseCardProps {
  useCase: UseCaseDTO,
  onCardClick: (id: string) => void;
}

export default function UseCaseCard({ useCase, onCardClick }: UseCaseCardProps) {
  const { id, title, date, systems, industries, thumbnail } = useCase;
  return (
    <div onClick={() => onCardClick(id)} className='group block h-full border border-gray-100 bg-white rounded-2xl shadow-md cursor-pointer'>
      <div className='relative w-full rounded-t-2xl overflow-hidden'>
        <div className='w-full aspect-[4/3] '>
          {thumbnail
            ? <Image src={thumbnail} alt={title} fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            : <ImagePlaceholder size='md' />
          }
        </div>
        <div className='absolute top-3 left-3 z-5 flex flex-wrap gap-1'>
          {industries?.map((i) => (
            <Badge
              key={i.id}
              label={i.name}
              variant="filled"
            />
          ))}
        </div>

        {/* 호버시 나타나는 검정레이어 */}
        <div className={cn('absolute inset-0 z-10 bg-black/70 opacity-0 group-hover:opacity-100',
          'transition-all duration-300',
          'flex flex-col justify-center items-center p-6 text-center')}
        >
          <p className='text-[10px] text-main font-bold tracking-[0.2em] mb-2'>SYSTEMS</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {systems?.map((s) => (
              <span key={s.id} className='text-white font-semibold text-sm md:text-base border-b border-white/30 pb-0.5'>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='px-5 py-6'>
        <h3 className='min-h-[3.5rem] md:min-h-[4rem] text-lg md:text-xl line-clamp-2 break-keep font-bold group-hover:text-main transition-colors'>{title}</h3>
        <p className='tracking-tight font-medium text-gray-400 text-xs md:text-sm'>{date}</p>
      </div>
    </div>
  )
}
