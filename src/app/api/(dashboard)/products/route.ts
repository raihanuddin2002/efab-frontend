import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ProductFormValue } from '@/app/(AdminPanel)/dashboard/products/add/page'

export async function GET() {
    try {
        const products = await prisma.product.findMany()

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

        const isExist = await prisma.product.findFirst({
            where: {
                product_code: data.product_code
            },
        })

        if (isExist) {
            return NextResponse.json({ message: 'Product code already exists' }, { status: 409 })
        }

        const result = await prisma.product.create({
            data: {
                name: data.name,
                product_code: data.product_code,
                admin_price: Number(data.admin_price),
                selling_price: Number(data.selling_price),
                regular_price: Number(data.regular_price),
                discount: Number(data.discount),
            },
        })

        return NextResponse.json({ product: result, message: 'Product created successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Something went wrong' },
            { status: 500 }
        )
    }
}
