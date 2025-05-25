import React from 'react'
import AdminPanelLayout from '@/components/layout/admin-panel'

export default function AdminPanelLayoutMain({ children }: { children: React.ReactNode }) {
    return (
        <AdminPanelLayout>
            {children}
        </AdminPanelLayout>
    )
}
