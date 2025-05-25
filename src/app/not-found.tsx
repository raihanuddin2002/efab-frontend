import React from 'react'
import { LAYOUT } from '../confiig/layout-config'
import Link from 'next/link'

export default function NotFoundPage() {
    return (
        <div
            style={{ height: `calc(100vh - ${LAYOUT.TOP_HEADER}px)` }}
            className='flex flex-col items-center pt-[100px] bg-gray-100'
        >
            <h1 className="text-4xl font-bold text-center mt-20 mb-5">404 - Page Not Found</h1>
            <Link href="/" className='text-underline text-blue-600 hover:text-blue-800 transition-colors'>
                Back to Home
            </Link>
        </div>
    )
}
