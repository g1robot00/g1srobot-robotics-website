import { useEffect } from 'react'
import { PortableText } from '@portabletext/react'

import { cn } from '@/lib/utils'
import Portal from '../shared/Portal'
import { PolicyItem } from '@/types/respDto'
import { X } from 'lucide-react'

interface PolicyModalProps {
    data: PolicyItem
    onClose: () => void
}

const components = {
    block: {
        // H3 스타일 정의
        h3: ({ children }: any) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
        // 일반 본문 스타일 정의
        normal: ({ children }: any) => <p className="mb-3 leading-relaxed">{children}</p>,
    },
    list: {
        // 리스트 스타일 정의
        bullet: ({ children }: any) => <ul className="list-disc ml-5 mb-4">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal ml-5 mb-4">{children}</ol>,
    },
    marks: {
        // 링크 스타일 정의
        link: ({ children, value }: any) => (
            <a href={value.href} className="text-main underline" target="_blank" rel="noreferrer">
                {children}
            </a>
        ),
    },
};

export default function PolicyModal({ onClose, data }: PolicyModalProps) {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => { document.body.style.overflow = originalStyle; }
    }, []);

    return (
        <Portal>
            <div className='fixed inset-0 z-[110]  flex items-center justify-center  px-4 md:px-10 xl:px-20 3xl:!px-30'>
                <div onClick={onClose} className='absolute inset-0 bg-black/40 backdrop-blur-lg cursor-pointer' />
                <div className={cn('z-10 w-[90vw] max-w-2xl min-h-[50vh] max-h-[90vh] md:max-h-[80vh] 3xl:!h-[800px]',
                    'p-6 md:p-10 bg-white rounded-2xl flex flex-col gap-5')}
                >
                    <div className='flex items-center justify-between border-b pb-2'>
                        <h2 className="text-xl font-bold">{data.title}</h2>
                        <button onClick={onClose} className='p-0 md:p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors cursor-pointer'>
                            <X />
                        </button>
                    </div>
                    <div className='prose prose-sm max-w-none overflow-y-auto p-2 '>
                        <PortableText value={data.content} components={components}/>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
