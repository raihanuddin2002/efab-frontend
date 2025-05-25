import { cn } from '@/lib/cn';
import React from 'react'

type Props = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export default function Container({ style, children, className }: Props) {
    return (
        <div
            style={style}
            className={cn('max-w-[1200px] w-full mx-auto px-4', className)}
        >
            {children}
        </div>
    )
}
