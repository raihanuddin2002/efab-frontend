import React from 'react'
import { cn } from '@/lib/cn'

type Props = {
    parentClassName?: string
    parentStyle?: React.CSSProperties
    childClassName?: string
    childStyle?: React.CSSProperties
}

export default function LinearProgress({
    parentClassName,
    parentStyle,
    childClassName,
    childStyle
}: Props) {
    return (
        <div className={cn("overflow-hidden h-[4px] w-full bg-slate-400 absolute top-[70px] left-0 z-[2]", parentClassName)} style={parentStyle}>
            <div className={cn(`
                w-full 
                h-full
                relative
                before:h-full
                before:absolute 
                before:content-'' 
                before:animate-linear_before
                before:bg-black
                after:h-full
                after:absolute
                after:content-''
                after:animate-linear_after
                after:bg-black 
            `, childClassName)} style={childStyle}>

            </div>
        </div>
    )
}