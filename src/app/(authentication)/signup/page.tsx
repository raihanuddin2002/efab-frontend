'use client'

import React, { useRef, useState } from 'react'
import { GenericForm, GenericFormRef } from '@/components/form/GenericForm';
// import { isUserType, UserFormValue, userSchema } from '../types.auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/form/fields/TextField';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { supabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { z } from 'zod';
import { isUserType } from '../type.auth';

const userSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirm_password: z.string(),
})
    .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
    });

export type UserFormValue = z.infer<typeof userSchema>

export default function SignUp() {
    const router = useRouter()
    const formRef = useRef<GenericFormRef<UserFormValue>>(null);
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<UserFormValue>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const handleFormSubmit = async (values: UserFormValue) => {
        setIsLoading(true)

        try {
            const isUser = isUserType(values)

            if (!isUser) {
                toast.error('Invalid user data')
                return
            }

            const { data, error } = await supabaseBrowserClient().auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        full_name: values.name
                    }
                }
            })

            if (error) {
                throw new Error(error.message)
            }

            toast.success(`User created successfully.`)
            form.reset()
            router.push('/login')
        } catch (error) {
            console.error(error)
            toast.error('Network or server error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <h1 className='text-2xl md:text-3xl font-bold mt-10'>Welcome to Sign up</h1>
            <h3 className='text-sm md:mt-2 mb-10 text-slate-400'>
                Create a new account just a few steps.
            </h3>

            <GenericForm
                ref={formRef}
                schema={userSchema}
                initialValues={form.getValues()}
                onSubmit={(values) => {
                    handleFormSubmit(values)
                }}
            >
                <div className='w-full lg:w-4/5 grid grid-cols-1 gap-6'>
                    <TextField
                        name='name'
                        label='Name'
                        placeholder='Enter your name'
                        required
                    />
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

                    <TextField
                        name='confirm_password'
                        label='Confirm Password'
                        placeholder='Confirm your password'
                        required
                    />

                    <Button
                        type='submit'
                        disabled={isLoading}
                    >
                        Sign Up
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