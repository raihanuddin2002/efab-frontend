'use client'

import React from 'react'
import Logo from '@/components/Logo'
import { LAYOUT } from '@/confiig/layout-config'
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/cn'
import MenuItems from './menu-items'

type Props = {
    openSidebar: boolean,
    onSideChange: (value: boolean) => void
}

export default function AdminSidebar({ openSidebar, onSideChange }: Props) {
    return (
        <section
            style={{ width: `${LAYOUT.ADMIN_SIDEBAR}px` }}
            className={cn('bg-slate-100 h-full px-4 fixed top-0 left-0 overflow-y-auto', {
                'left-[-500%]': !openSidebar
            })}
        >
            <div className='mb-8 py-4 sticky top-0 bg-slate-100'>
                <Logo />
            </div>

            <MenuItems />

            <div
                style={{
                    height: '100%',
                    width: LAYOUT.ADMIN_SIDEBAR_COLLAPSED_BAR + 'px',
                    left: openSidebar ? `${LAYOUT.ADMIN_SIDEBAR}px` : "0"
                }}
                onClick={() => onSideChange(!openSidebar)}
                className={cn('h-full bg-slate-200 fixed top-0 flex items-center justify-center cursor-pointer hover:bg-slate-400 hover:scale-105 transition-all z-[-1]')}
            >
                {openSidebar ? (
                    <FontAwesomeIcon icon={faCircleArrowLeft} size='lg' />
                ) : (
                    <FontAwesomeIcon icon={faCircleArrowRight} size='lg' />
                )}
            </div>
        </section>
    )
}


