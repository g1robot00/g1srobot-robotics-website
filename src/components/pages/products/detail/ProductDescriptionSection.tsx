import Image from 'next/image';
import Link from 'next/link';

import {  UniversalDetailDTO } from '@/types/respDto'
import ProductDescriptionSpecsTable from './ProductDescriptionSpecsTable';
import { ImageOff } from 'lucide-react';

interface DescriptionSectionProps {
    product: UniversalDetailDTO
    from?: 'industry' | 'productLine'
}

export default function ProductDescriptionSection({product, from}: DescriptionSectionProps) {
    const { name, nameEn, specs, specsImg, robots, components} = product;

    const showSpecsImg = specsImg && ( !specs || specs.length <= 3) ;
    const RelatedItems = robots || components || [];

  return (
    <div className='grid grid-cols-1 gap-15 md:gap-25 '>
        { ((specs && specs.length > 0) || (specsImg && typeof specsImg === 'string')) &&
            <div className='flex flex-col gap-10'>
                <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 사양</h3>
                {showSpecsImg 
                    ? <Image src={specsImg} alt={`${name}(${nameEn}) 상세 사양표`} width={1000} height={800} />
                    : <ProductDescriptionSpecsTable specs={specs}/>
                }
            </div>
        }
        { RelatedItems && RelatedItems.length > 0 &&
            <div className='flex flex-col gap-10'>
                <h3 className='font-bold text-base md:text-lg text-gray-700'>핵심 구성 제품</h3>
                <div className='grid gap-3 grid-cols-3 md:grid-cols-6'>
                    {RelatedItems?.map((item,idx) => (
                        <div key={`${idx}_${item.id}`} className='flex flex-col gap-2'>
                            <div className='relative flex-1 h-full w-full overflow-hidden aspect-square'>
                                {item.mainImage 
                                    ?<Link href={`${item.href}?from=${from}`}>
                                        <Image src={item.mainImage} alt={item.name} fill className="object-cover"/>
                                    </Link>
                                    :<div className='w-full h-full bg-gray-200 text-gray-400 text-[9px]  flex flex-col gap-2 justify-center items-center'>
                                        <ImageOff size={20}/>
                                        이미지 준비중
                                    </div>
                                }
                            </div>
                            <span className='text-sm md:text-base text-gray-700 line-clamp-2 break-keep min-h-[2.5rem] md:min-h-[3rem]'>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        }
    </div>
  )
}
