"use client"

import { TextField } from '@/components/form/fields/TextField'
import { GenericForm, GenericFormRef } from '@/components/form/GenericForm'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
    admin_price: z.number().min(0, 'Admin price must be at least 0'),
    selling_price: z.number().min(0, 'Selling price must be at least 0'),
    regular_price: z.number().min(0, 'Regular price must be at least 0'),
    discount: z.number().min(0, 'Discount must be at least 0'),
})

export type ProductFormValue = z.infer<typeof productSchema>;

export default function AddProduct() {
    const formRef = useRef<GenericFormRef<ProductFormValue>>(null);
    const [product, setProduct] = useState(initialProductState)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProductFormValue>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            product_code: '',
            admin_price: 0,
            selling_price: 0,
            regular_price: 0,
            discount: 0,
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        })
    }

    const resetForm = () => {
        setProduct(initialProductState)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message || 'Something went wrong')
                return
            }

            toast.success(`${data.message} (${data.product.product_code})`)
            resetForm()
        } catch (error) {
            console.error(error)
            toast.error('Network or server error')
        } finally {
            setIsLoading(false)
        }
    }


    // const handleSubmit = (values: ProductFormValue) => {
    //     console.log(values)
    // }

    return (
        <div className='max-w-[800px] w-full mx-auto pt-[10px] text-center'>
            <div className='card w-full bg-slate-50 px-4 py-10'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-2xl uppercase font-bold mb-10'>
                        Create a new product
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-10'>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Product Name'
                            label='Enter Name'
                            className='w-full mb-4'
                            autoFocus
                            required
                            value={product.name}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <Input
                            type='text'
                            name='product_code'
                            placeholder='Enter Code'
                            label='Product Code'
                            className='w-full mb-4'
                            required
                            value={product.product_code}
                            onChange={handleChange}
                            autoComplete='off'
                        />

                        <Input
                            type='number'
                            name='admin_price'
                            placeholder='Enter Admin Price'
                            label='Admin Price'
                            className='w-full mb-4'
                            required
                            value={product.admin_price}
                            onChange={handleChange}
                            autoComplete='off'
                        />

                        <Input
                            type='number'
                            name='selling_price'
                            placeholder='Enter Selling Price'
                            label='Selling Price'
                            className='w-full mb-4'
                            required
                            value={product.selling_price}
                            onChange={handleChange}
                            autoComplete='off'
                        />

                        <Input
                            type='number'
                            name='regular_price'
                            placeholder='Enter Regular Price'
                            label='Regular Price'
                            className='w-full mb-4'
                            required
                            value={product.regular_price}
                            onChange={handleChange}
                            autoComplete='off'
                        />

                        <Input
                            type='number'
                            name='discount'
                            placeholder='Enter Discount'
                            label='Discount'
                            className='w-full mb-4'
                            value={product.discount}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </div>

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
                </form>
            </div>
        </div>
    )
}
