import React from 'react'
import Image from 'next/image';
import { cn } from '../lib/cn';

type LogoProps = {
    className?: string;
    style?: React.CSSProperties;
}

export default function Logo({ className, style }: LogoProps) {
    return (
        <Image
            style={style}
            src="/images/efab_new_bg_remove.png"
            alt="Logo"
            className={cn('rounded-full brightness-0', className)}
            width={50}
            height={50}
            priority
        />
    )
}
