'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import debounce from '@/utils/debounce'
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProductFormValue } from '@/app/(AdminPanel)/dashboard/products/add/page'

export default function Searchbar() {
    const [searchText, setSearchText] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [products, setProducts] = useState<ProductFormValue[] | null>(null)

    const debouncedSearch = useMemo(() => {
        return debounce((value: string) => {
            setSearchText(value)
        }, 500)
    }, [])

    const handleResetSearch = () => {
        setSearchText('')
        setInputValue('')
    }

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch('/api/products')
            const data = await response.json()
            setProducts(data)
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        if (searchText) {
            console.log('Searching for:', searchText)
        }
    }, [searchText])

    return (
        <div>
            <div className='max-w-[500px] w-full relative mx-auto mb-10'>
                <Input
                    className="border-black"
                    type="text"
                    name='search'
                    placeholder='Enter product code'
                    autoComplete='off'
                    onChange={(e) => {
                        const value = e.target.value
                        setInputValue(value)
                        debouncedSearch(value)
                    }}
                    value={inputValue}
                    autoFocus
                    area-label='Search Product'
                    required
                />

                {
                    inputValue ? (
                        <FontAwesomeIcon
                            icon={faClose}
                            className='absolute right-4 top-1/3 cursor-pointer'
                            size='sm'
                            onClick={handleResetSearch}
                            title='Reset Search'
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faSearch}
                            className='absolute right-4 top-1/3 cursor-pointer'
                            size='sm'
                        />
                    )
                }
            </div>

            <div className='grid grid-cols-1 gap-4'>
                {
                    searchText && products?.length ? (
                        products
                            .filter((product) => product.product_code.toLowerCase().includes(searchText.toLowerCase()))
                            .map((product) => (
                                <div
                                    key={product.product_code}
                                    className='card max-w-[500px] w-full mx-auto p-10 bg-slate-50'
                                >
                                    <h2 className='text-2xl font-semibold'>Name: {product.name}</h2>
                                    <h4 className='font-bold text-2xl mb-3'>Code: {product.product_code}</h4>
                                    <p className='text-xl text-slate-700'>Admin Price: &#2547; {product.admin_price}</p>
                                    <p className='text-xl font-bold'>Selling Price: &#2547; {product.selling_price}</p>
                                    <p className='text-xl text-slate-700'>Regular Price: &#2547; {product.regular_price}</p>
                                    <p className='text-xl text-slate-700'>Commission: &#2547; {product.admin_price - product.selling_price}</p>
                                    <p className='text-xl text-slate-700'>Discount: {product.discount}%</p>
                                </div>
                            ))
                    ) : (
                        <p className='text-center'>No products found</p>
                    )
                }
            </div>
        </div>
    )
}
