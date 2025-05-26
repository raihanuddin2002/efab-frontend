import { NextResponse } from 'next/server'
import { ProductFormValue } from '@/app/(AdminPanel)/dashboard/products/types.product'
import { createProductInDB, fetchProducts } from './controller'

export async function GET() {
    try {
        const products = await fetchProducts()

        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Something went wrong' },
            { status: 500 }
        )
    }
}

// create product
export async function POST(req: Request) {
    try {
        const data: ProductFormValue = await req.json()

        const result = await createProductInDB(data)

        return NextResponse.json({ product: result, message: 'Product created successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Something went wrong' },
            { status: 500 }
        )
    }
}

