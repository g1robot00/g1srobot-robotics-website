import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { UniversalDetailDTO } from '@/types/respDto'
import ProductDescriptionSpecsTable from './ProductDescriptionSpecsTable';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

interface DescriptionSectionProps {
    product: UniversalDetailDTO
    from?: 'industry' | 'productLine'
}

export default function ProductDescriptionSection({ product, from }: DescriptionSectionProps) {
    const { name, nameEn, specs, specsImg, robots, components } = product;

    const showSpecsImg = specsImg && (!specs || specs.length <= 3);
    const RelatedItems = robots || components || [];

    return (
        <div className='grid grid-cols-1 gap-15 md:gap-25 '>
            {((specs && specs.length > 0) || (specsImg && typeof specsImg === 'string')) &&
                <div className='flex flex-col gap-10'>
                    <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 사양</h3>
                    {showSpecsImg
                        ? <Image src={specsImg} alt={`${name}(${nameEn}) 상세 사양표`} width={1000} height={800} />
                        : <ProductDescriptionSpecsTable specs={specs} />
                    }
                </div>
            }
            {RelatedItems && RelatedItems.length > 0 &&
                <div className='flex flex-col gap-10'>
                    <h3 className='font-bold text-base md:text-lg text-gray-700'>핵심 구성 제품</h3>
                    <div className='grid gap-3 grid-cols-3 md:grid-cols-6'>

                        {RelatedItems.map((item) => {
                            const isPreparing = !item.hasContent;
                            return(
                                <Link 
                                    key={item.id} 
                                    href={`${item.href}?from=${from}`}
                                    onClick={e => {if(isPreparing) e.preventDefault()}}
                                    className={cn('group flex flex-col gap-2', 
                                        isPreparing && 'cursor-not-allowed')}
                                >
                                    <div className={cn('relative flex-1 h-full w-full overflow-hidden aspect-square bg-gray-100',
                                                    isPreparing && 'grayscale opacity-70'
                                                )}
                                    >
                                        {item.mainImage 
                                            ? <Image 
                                                src={item.mainImage} 
                                                alt={item.name} 
                                                fill 
                                                className={cn("object-cover transition-all duration-400", !isPreparing && 'group-hover:scale-110')} 
                                                sizes='(max-width: 768px) 33vw, 20vw'
                                            />
                                            : <ImagePlaceholder size='sm' text={isPreparing ? 'Info Preparing': 'Image Preparing'}/>
                                        }
                                        {isPreparing &&
                                            <div className={cn('absolute inset-0 z-5', 
                                                            'p-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity', 
                                                            'flex justify-center items-center')}
                                            >
                                                <span className='text-white text-center break-keep'>상세정보 준비중인<br/>제품입니다</span>
                                            </div>
                                        }
                                    </div>
                                    <span className={cn('font-medium text-sm md:text-base line-clamp-2 break-keep min-h-[2.5rem] md:min-h-[3rem]',
                                                        isPreparing ? 'text-gray-400' : 'text-gray-700 group-hover:text-main')}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            )
                        })}
                        
                    </div>
                </div>
            }
        </div>
    )
}
