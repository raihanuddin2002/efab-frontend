'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/cn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { sidebarMenuItems } from '@/components/layout/admin-panel/sidebar-menu-config'

export default function MenuItems() {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(true)
    const [collapsedId, setCollapsedId] = useState('')

    const handleCollapse = (id: string) => {
        setCollapsed(prev => !prev)
        setCollapsedId(id)
    }

    return (
        <ul className='flex flex-col gap-2'>
            {sidebarMenuItems.map((item) => {
                const isActive = item.link === pathname;

                return (
                    <React.Fragment key={item.link}>
                        <li
                            className={cn(`
                                    flex 
                                    items-center 
                                    gap-2 
                                    p-2 
                                    rounded 
                                    hover:bg-slate-200 
                                    transition-colors
                                    cursor-pointer
                                `, {
                                'bg-slate-200': isActive || collapsedId === item.link
                            })}

                            onClick={() => {
                                if (item.hasdropdown) {
                                    handleCollapse(item.link)
                                    return;
                                }

                                handleCollapse('')
                                router.push(item.link)
                            }}
                        >
                            <div className='flex items-center justify-between w-full'>
                                <div>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span className='ms-2'>{item.title}</span>
                                </div>

                                {/* Dropdown icon */}
                                <div className='pe-1'>
                                    {
                                        item.hasdropdown && item.childrens && (
                                            !collapsed && collapsedId === item.link ? (
                                                <FontAwesomeIcon icon={faCaretUp} size='xs' />
                                            ) : (
                                                <FontAwesomeIcon icon={faCaretDown} size='xs' />
                                            )
                                        )
                                    }
                                </div>

                            </div>
                        </li>


                        {!collapsed && collapsedId === item.link && item.hasdropdown &&
                            item.childrens.length > 0 && (
                                <ul className='pl-4'>
                                    {item.childrens.map((child) => {
                                        const isChildActive = child.link === pathname;

                                        return (
                                            <Link href={child.link} key={child.link}>
                                                <li
                                                    key={child.link}
                                                    className={cn(`
                                                        flex 
                                                        items-center 
                                                        gap-2 
                                                        p-2 
                                                        rounded 
                                                        hover:bg-slate-200 
                                                        transition-colors
                                                        cursor-pointer
                                                    `, {
                                                        'bg-slate-300': isChildActive,
                                                    })}
                                                >
                                                    <FontAwesomeIcon icon={child.icon} size='xs' />
                                                    <span>{child.title}</span>
                                                </li>
                                            </Link>
                                        )
                                    })}
                                </ul>
                            )}
                    </React.Fragment>
                )
            })}
        </ul>
    )
}