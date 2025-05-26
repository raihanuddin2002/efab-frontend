import React from 'react'
import ComingSoon from '@/components/coming-soon'
import { fetchProductsServer } from '@/app/supabase-server-actions'

export default async function AllProductsPage() {
    const products = await fetchProductsServer()

    return (
        <section>
            <h2 className='text-2xl font-bold mb-10 uppercase text-center'>All Products</h2>
            <div className='flex flex-wrap justify-center items-center gap-6'>
                {
                    products && products.length > 0 && (
                        products
                            .map((product) => {
                                return (
                                    <div
                                        key={product.product_code}
                                        className='card max-w-[500px] w-full p-10 bg-slate-50'
                                    >
                                        <h2 className='text-2xl font-semibold'>Name: {product.name}</h2>
                                        <h4 className='font-bold text-2xl mb-3'>Code: {product.product_code}</h4>
                                        <p className='text-xl text-slate-700'>Admin Price: &#2547; {product?.admin_price}</p>
                                        <p className='text-xl font-bold'>Selling Price: &#2547; {product?.selling_price}</p>
                                        <p className='text-xl text-slate-700'>Regular Price: &#2547; {product?.regular_price}</p>
                                        <p className='text-xl text-slate-700'>Commission: &#2547; {product?.admin_price && product?.selling_price ? product?.admin_price - product?.selling_price : 0}</p>
                                        <p className='text-xl text-slate-700'>Discount: {product?.discount}%</p>
                                    </div>
                                )
                            })
                    )

                }

                {/* {searchText && filteredProducts?.length === 0 && (
                    <p className='text-center text-red-500 text-xl'>No products found!</p>
                )} */}
            </div>
        </section>
    )
}
