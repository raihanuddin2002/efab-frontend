import { fetchProductByIdServer } from '@/app/supabase-server-actions'
import React from 'react'
import { isProductType } from '../../types.product'
import EditProduct from './edit-product'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const productId = Number((await params).id)

    if (isNaN(productId)) {
        console.error('Invalid product ID')
        throw new Error('Invalid product ID')
    }

    let product = null

    try {
        product = await fetchProductByIdServer(productId)
        const isProduct = isProductType(product)

        if (!isProduct) {
            console.error('Invalid product data')
            throw new Error('Invalid product data')
        }
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            {!product && (
                <p className='text-center text-red-500 text-xl'>Product not found!</p>
            )}
            {product && <EditProduct product={product} />}
        </div>
    )
}
