import React from 'react'
import AdminPanelLayout from '@/components/layout/admin-panel'
import { getSession } from '@/app/supabase-server-actions'
import { redirect } from 'next/navigation'
import { paths } from '@/confiig/paths.cofig'

export default async function AdminPanelLayoutMain({ children }: { children: React.ReactNode }) {
    const session = await getSession()

    if (!session) {
        redirect(paths.auth.login)
    }

    return (
        <AdminPanelLayout>
            {children}
        </AdminPanelLayout>
    )
}
