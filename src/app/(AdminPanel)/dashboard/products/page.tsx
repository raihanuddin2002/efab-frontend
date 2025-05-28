import React from 'react'
import { fetchProductsServer } from '@/app/supabase-server-actions'
import ProductCard from './_components/product-card'

export default async function AllProductsPage() {
    const products = await fetchProductsServer()

    return (
        <section>
            <h2 className='text-2xl font-bold mb-10 uppercase text-center'>All Products</h2>
            <div className='flex flex-wrap justify-center items-stretch gap-6'>
                {
                    products && products.length > 0 ? (
                        products
                            .map((product) => {
                                return (
                                    <ProductCard
                                        key={product.product_code}
                                        product={product}
                                    />
                                )
                            })
                    ) : (
                        <p className='text-center text-red-500 text-xl'>No products found!</p>
                    )
                }
            </div>
        </section>
    )
}
