'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { supabaseBrowserClient } from '@/lib/supabase'

export const Logout = async () => {
    await supabaseBrowserClient().auth.signOut()
    window.location.reload()
}

export const navLinks = (isLoggedIn: boolean) => {
    return [
        {
            name: "Home",
            href: "/",
            loginRoute: true,
            normalRoute: true,
            show: true
        },
        {
            name: "Login",
            href: "/login",
            loginRoute: false,
            normalRoute: true,
            show: !isLoggedIn
        },
        {
            name: "Sign up",
            href: "/signup",
            loginRoute: false,
            normalRoute: true,
            show: !isLoggedIn
        },
        {
            name: "Dashboard",
            href: "/dashboard",
            loginRoute: false,
            normalRoute: false,
            show: isLoggedIn
        }
    ]
}

export default function Nav() {
    const pathname = usePathname()
    const [showResponsiveNav, setShowResponsiveNav] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabaseBrowserClient().auth.getSession()
            setIsLoggedIn(!!data.session?.user)
        }

        fetchSession()
    }, [])

    return (
        <>
            <nav className={`
                h-auto
                w-full
                bg-slate-200
                absolute
                text-center
                py-6
                ${showResponsiveNav ? 'right-0 block' : 'right-[-1000px] hidden'}
                top-[70px]
                z-10
                border-t
                border-black
                md:w-auto
                md:bg-transparent
                md:static
                md:flex
                md:gap-4   
            `}>
                {
                    navLinks(isLoggedIn)
                        .filter(nav => nav.show)
                        .map(nav => {
                            const isActive = nav.href === pathname;

                            return (
                                <div
                                    key={nav.href}
                                    onClick={() => setShowResponsiveNav(false)}
                                    className={`${showResponsiveNav && 'px-6 py-3 md:p-0 hover:bg-black md:hover:bg-transparent hover:text-white md:hover:text-black'}`}
                                >
                                    <Link
                                        href={nav.href}
                                        className={`md:hover:underline ${isActive && 'font-bold'}`}
                                    >
                                        {nav.name}
                                    </Link>
                                </div>
                            )
                        })
                }

                {isLoggedIn && <div
                    className={`${showResponsiveNav && 'px-6 py-3 md:p-0 hover:bg-black md:hover:bg-transparent hover:text-white md:hover:text-black'}`}
                >
                    <Link
                        href={'#'}
                        className={`md:hover:underline`}
                        onClick={Logout}
                    >
                        Logout
                    </Link>
                </div>}
            </nav>
            <button
                type='button'
                className='block md:hidden'
                onClick={() => setShowResponsiveNav(prev => !prev)}
            >
                <FontAwesomeIcon icon={faBars} size='xl' />
            </button>
        </>
    )
}
