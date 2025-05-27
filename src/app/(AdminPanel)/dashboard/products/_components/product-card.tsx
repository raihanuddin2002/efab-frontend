import React from 'react'
import { ProductType } from '../types.product'
import CopyButton from '@/components/ui/copy-button'

type Props = {
    product: ProductType
}

export default function ProductCard({
    product,
}: Props) {
    return (
        <div className='card max-w-[500px] w-full relative p-10 bg-slate-50'>
            <h2 className='text-2xl font-semibold'>Name: {product.name}</h2>
            <h4 className='font-bold text-2xl mb-3'>
                Code: {product.product_code}

                <CopyButton
                    className='ms-2'
                    value={product.product_code}
                    title='Copy Product Code'
                />
            </h4>

            <p className='text-xl text-slate-700'>
                Admin Price: {product?.admin_price ? "৳" + product?.admin_price : "N/A"}
            </p>

            <p className='text-xl font-bold'>
                Selling Price: ৳{product?.selling_price}

                <CopyButton
                    className='ms-2'
                    value={product?.selling_price?.toString()}
                    title='Copy Selling Price'
                />
            </p>

            <p className='text-xl text-slate-700'>
                Regular Price:  {product?.regular_price ? "৳" + product?.regular_price : "N/A"}
            </p>

            <p className='text-xl text-slate-700'>
                Commission: ৳{Number(product?.selling_price || 0) - Number(product?.admin_price || 0)}
            </p>

            <p className='text-xl text-slate-700'>
                Discount: {product?.discount ? product?.discount + "%" : "N/A"}
            </p>


            {/* Copy Product details*/}
            <CopyButton
                className='absolute top-4 right-5'
                size='lg'
                value={`Name: ${product.name}\nCode: ${product.product_code}\nPrice: ${product.selling_price} tk`}
                title='Copy Product'
                icon='clipboard'
            />
        </div>
    )
}
