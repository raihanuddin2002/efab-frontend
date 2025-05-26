"use client"

import { TextField } from '@/components/form/fields/TextField'
import { GenericForm, GenericFormRef } from '@/components/form/GenericForm'
import { Button } from '@/components/ui/button'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const initialProductState = {
    name: '',
    product_code: '',
    admin_price: 0,
    selling_price: 0,
    regular_price: 0,
    discount: 0,
}

const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    product_code: z.string().min(3, 'Code must be at least 3 characters long'),
    admin_price: z.coerce.number().min(0, 'Admin price must be at least 0').optional(),
    selling_price: z.coerce.number().min(0, 'Selling price must be at least 0'),
    regular_price: z.coerce.number().min(0, 'Regular price must be at least 0').optional(),
    discount: z.coerce.number().min(0, 'Discount must be at least 0').optional(),
});

export type ProductFormValue = z.infer<typeof productSchema>;

export default function AddProduct() {
    const formRef = useRef<GenericFormRef<ProductFormValue>>(null);
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProductFormValue>({
        resolver: zodResolver(productSchema),
        defaultValues: initialProductState,
    });


    const handleFormSubmit = async (values: ProductFormValue) => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message || 'Something went wrong')
                return
            }

            toast.success(`${data.message} (${data.product.product_code})`)
            form.reset()
        } catch (error) {
            console.error(error)
            toast.error('Network or server error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='max-w-[800px] w-full mx-auto py-10'>
            <div className='card w-full bg-slate-50 px-4 py-10'>
                <h2 className='text-2xl font-bold mb-10 uppercase text-center'>Create New Product</h2>

                <GenericForm
                    ref={formRef}
                    schema={productSchema}
                    initialValues={initialProductState}
                    onSubmit={(values) => {
                        handleFormSubmit(values)
                    }}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-10'>
                        <TextField<ProductFormValue>
                            name='name'
                            label='Name'
                            placeholder='Enter Name'
                            required
                        />

                        <TextField<ProductFormValue>
                            name='product_code'
                            label='Product Code'
                            placeholder='Enter Product Code'
                            required
                        />

                        <TextField<ProductFormValue>
                            name='admin_price'
                            label='Admin Price'
                            placeholder='Enter Admin Price'
                            type='number'
                        />

                        <TextField<ProductFormValue>
                            name='selling_price'
                            label='Selling Price'
                            placeholder='Enter Selling Price'
                            type='number'
                        />

                        <TextField<ProductFormValue>
                            name='regular_price'
                            label='Regular Price'
                            placeholder='Enter Regular Price'
                            type='number'
                            required
                        />

                        <TextField<ProductFormValue>
                            name='discount'
                            label='Discount'
                            placeholder='Enter Discount'
                            type='number'
                        />
                    </div>

                    <div className='text-center'>
                        <Button
                            type='submit'
                            disabled={isLoading}
                            className='w-full mt-4 max-w-[300px] text-lg mx-auto py-2 pt-1 hover:scale-105 hover:opacity-80 transition-all'
                        >
                            Create Product

                            {isLoading && (
                                <FontAwesomeIcon icon={faSpinner} className="ml-2 animate-spin" />
                            )}
                        </Button>
                    </div>
                </GenericForm>
            </div>
        </div>
    )
}