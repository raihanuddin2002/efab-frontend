'use client'

import { LAYOUT } from '@/confiig/layout-config'
import React, { useState } from 'react'
import AdminSidebar from './sidebar'
import { useMediaQuery } from 'react-responsive'

type Props = {
    children: React.ReactNode
}

export default function AdminPanelLayout({ children }: Props) {
    const isDesktopScreen = useMediaQuery({ query: '(min-width: 1200px)' })
    const [openSidebar, setOpenSidebar] = useState(isDesktopScreen ? true : false)

    const sidebarWidth = openSidebar ? (LAYOUT.ADMIN_SIDEBAR + LAYOUT.ADMIN_SIDEBAR_COLLAPSED_BAR) : LAYOUT.ADMIN_SIDEBAR_COLLAPSED_BAR

    return (
        <section style={{ height: `calc(100vh - ${LAYOUT.TOP_HEADER}px)` }} >
            <div className="flex h-full w-full">
                <AdminSidebar
                    openSidebar={openSidebar}
                    onSidebarChange={(value: boolean) => setOpenSidebar(value)}
                />

                {/* In desktop, children width minusing from sidebar width and in mobile taking full width */}
                <div
                    className='p-4 overflow-y-auto'
                    style={{
                        width: isDesktopScreen ? `calc(100% - ${sidebarWidth}px)` : '100%',
                        marginLeft: isDesktopScreen ? sidebarWidth + 'px' : '0',
                        paddingLeft: isDesktopScreen ? '0' : LAYOUT.ADMIN_SIDEBAR_COLLAPSED_BAR + 15 + 'px'
                    }}
                >
                    {children}
                </div>
            </div>
        </section>
    )
}
