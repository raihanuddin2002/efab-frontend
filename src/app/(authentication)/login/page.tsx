'use client'

import React, { useRef, useState } from 'react'
import { GenericForm } from '@/components/form/GenericForm'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericFormRef } from '@/components/form/GenericForm';
import { TextField } from '@/components/form/fields/TextField';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
import { supabaseBrowserClient } from '@/lib/supabase';
import { toast } from 'react-toastify';

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type LoginType = z.infer<typeof loginSchema>

export default function Login() {
    const router = useRouter()
    const formRef = useRef<GenericFormRef<LoginType>>(null);
    const form = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false)

    const handleFormSubmit = async (values: LoginType) => {
        setIsLoading(true)

        try {
            const { data, error } = await supabaseBrowserClient().auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            if (error) {
                throw new Error(error.message)
            }

            toast.success(`Login successfully`)
            form.reset()

            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 1000)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Network or server error')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <h1 className='text-2xl md:text-3xl font-bold mt-10'>Welcome back to login</h1>
            <h3 className='text-sm md:mt-2 mb-10 text-slate-400'>
                Enter your registered information.
            </h3>

            <GenericForm
                ref={formRef}
                schema={loginSchema}
                initialValues={form.getValues()}
                onSubmit={(values) => {
                    handleFormSubmit(values)
                }}
            >
                <div className='w-full lg:w-4/5 grid grid-cols-1 gap-6'>

                    <TextField
                        name='email'
                        label='Email'
                        placeholder='Enter your email'
                        required
                    />
                    <TextField
                        name='password'
                        label='Password'
                        placeholder='Enter your password'
                        required
                    />

                    <Button
                        type='submit'
                        disabled={isLoading}
                    >
                        Login
                        {isLoading && (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                            />
                        )}
                    </Button>
                </div>
            </GenericForm>
        </>
    )
}
