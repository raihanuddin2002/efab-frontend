import { getSession } from '@/app/supabase-server-actions'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default async function DashboardPage() {
    const session = await getSession()

    return (
        <section className='py-[50px]'>
            <h2 className='text-3xl text-center font-bold mb-10'>Welcome to efab Admin Dashboard!</h2>

            {session && (
                <div className='text-center'>
                    <div className='w-[100px] h-[100px] rounded-full bg-slate-200 mx-auto mb-5 flex items-center justify-center'>
                        <FontAwesomeIcon size='xl' className='text-slate-600' icon={faUser} />
                    </div>
                    <h4 className='text-4xl font-semibold'>{session.user?.user_metadata?.full_name}</h4>
                    <p className='text-xl'>{session.user?.email}</p>
                </div>
            )}
        </section>
    )
}
