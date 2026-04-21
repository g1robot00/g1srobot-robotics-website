import Link from 'next/link'

import { cn } from '@/lib/utils'
import ProductCardContent from './ProductCardContent'
import { ProductItemDTO } from '@/types/respDto'

interface ProductCardProps {
    product: ProductItemDTO,
    from?: 'industry' | 'productLine',
}

export default function ProductCard({ product, from }: ProductCardProps) {
    const { label, href, showProduct } = product;
    const isLinkable = showProduct !== false;
    const cardClassName = cn(
        'group block flex flex-col gap-4 p-2 md:p-3 transition-all duration-300 rounded-lg md:rounded-2xl cursor-pointer hover:bg-gray-100'
    );

    if (isLinkable) {
        return (
            <Link href={`${href}?from=${from}`} key={label} className={cardClassName}>
                <ProductCardContent product={product} isLinkable={isLinkable}/>
            </Link>
        )
    }

    return (
        <div key={label} className={cardClassName}>
            <ProductCardContent product={product} isLinkable={isLinkable}/>
        </div>
    );
}
