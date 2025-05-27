'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import debounce from '@/utils/debounce'
import { faClose, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchProductByCodeBrowser } from '@/app/supabase-browser-actions'
import { isProductType, ProductType } from '@/app/(AdminPanel)/dashboard/products/types.product'
import { toast } from 'react-toastify'
import { faClipboard, faCopy } from '@fortawesome/free-regular-svg-icons'
import CopyButton from '@/components/ui/copy-button'
import ProductCard from '../_components/product-card'

export default function SearchProducts() {
    const [searchText, setSearchText] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [product, setProduct] = useState<ProductType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

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
        if (!searchText) {
            setProduct(null)
            return
        }

        setIsLoading(true)

        fetchProductByCodeBrowser(searchText).then((data) => {
            const isProduct = isProductType(data)

            if (!isProduct) {
                console.error('Invalid product data')
                throw new Error('Invalid product data')
            }

            setProduct(data)
        }).finally(() => {
            setIsLoading(false)
        })
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

            <div className='flex flex-wrap justify-center items-center gap-x-2 gap-y-8'>
                {
                    product && (
                        <ProductCard
                            key={product.product_code}
                            product={product}
                        />
                    )
                }

                {
                    isLoading && (
                        <div className='flex justify-center items-center'>
                            <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                            />
                        </div>
                    )
                }
                {searchText && !isLoading && !product && (
                    <p className='text-center text-red-500 text-xl'>No products found!</p>
                )}
            </div>
        </div>
    )
}
