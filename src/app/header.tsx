'use client'
import Link from 'next/link'
import React from 'react'
import Logo from '../components/Logo'
import Nav from '../components/Nav'
import { LAYOUT } from '../confiig/layout-config'
import Container from '../components/container'
import { useMediaQuery } from 'react-responsive'

export default function Header() {
    const isDesktopScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    return (
        <>
            <header className='bg-slate-200'>
                <Container
                    style={{ height: LAYOUT.TOP_HEADER + "px" }}
                    className='
                        flex 
                        justify-between
                        items-center 
                    '
                >
                    {/* For small screen margin left */}
                    <Link href='/'>
                        <div
                            className='flex items-center'
                            style={{
                                marginLeft: isDesktopScreen ? '0px' : `${LAYOUT.ADMIN_SIDEBAR_COLLAPSED_BAR}px`
                            }}
                        >
                            <Logo className='me-2' />
                        </div>
                    </Link>

                    <Nav />
                </Container>
            </header>
        </>
    )
}
