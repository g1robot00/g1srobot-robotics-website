
import { cn } from "@/lib/utils"
import { Hexagon  } from "lucide-react"

interface ImagePlaceholderProps {
    className?: string;
    text?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function ImagePlaceholder({className, text, size = 'md'}: ImagePlaceholderProps) {
    const sizeStyle = {
        sm: {img: 'w-5 h-5 md:w-10 md:h-10', text: 'text-[8px]'},
        md: {img: 'w-10 h-10 md:w-14 md:h-14', text: 'text-[10px]'},
        lg: {img: 'w-14 h-14 md:w-18 md:h-18', text: 'text-[10px] md:text-xs'},
    }

    const currentSize = sizeStyle[size];

  return (
    <div className={cn('w-full h-full bg-brand-dark p-2 flex flex-col gap-2 md:gap-4 items-center justify-center', className)}>
        {/* FIXME 로고 */}
        <div className="opacity-20 text-main">
            <Hexagon strokeWidth={5} className={currentSize.img}/>
        </div>
        <p className={`${currentSize.text} text-[8px] font-bold tracking-[0.2rem] opacity-20 text-main text-center uppercase`}>
            {text || 'Image coming soon'}
        </p>
    </div>
  )
}
