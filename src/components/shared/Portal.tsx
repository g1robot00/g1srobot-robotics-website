'use client'

import { useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); //브라우저에 마운트된 후에만 실행
        return () => setMounted(false);
    }, []);

    return mounted ? createPortal(children, document.body) : null;
}
