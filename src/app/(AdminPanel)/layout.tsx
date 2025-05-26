import React from 'react'
import AdminPanelLayout from '@/components/layout/admin-panel'
import { getSession } from '@/app/supabase-server-actions'
import { redirect } from 'next/navigation'

export default async function AdminPanelLayoutMain({ children }: { children: React.ReactNode }) {
    const session = await getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <AdminPanelLayout>
            {children}
        </AdminPanelLayout>
    )
}
