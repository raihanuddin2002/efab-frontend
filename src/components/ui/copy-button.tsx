"use client"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faCopy } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/cn'

type CopyButtonProps = {
    style?: React.CSSProperties
    className?: string
    value?: string
    title?: string
    size?: 'xs' | 'sm' | 'lg' | 'xl',
    icon?: "copy" | "clipboard"
}

export default function CopyButton({
    value,
    title,
    className,
    style,
    size,
    icon = "copy",
}: CopyButtonProps) {
    return (
        <span
            style={style}
            className={cn('cursor-pointer hover:scale-105 hover:opacity-[60%] transition-all', className)}
            title={title || 'Copy'}
        >
            <FontAwesomeIcon
                icon={icon === 'copy' ? faCopy : faClipboard}
                size={size || 'sm'}
                onClick={() => navigator.clipboard.writeText(value || '')}
            />
        </span>
    )
}
