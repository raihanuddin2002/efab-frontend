import { ProductFormValue } from "@/app/(AdminPanel)/dashboard/products/types.product"
import { prisma } from "@/lib/prisma"

export async function fetchProducts() {
    try {
        const products = await prisma.product.findMany()

        return products
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch products')
    }
}

export async function createProductInDB(data: ProductFormValue) {
    const existing = await prisma.product.findFirst({
        where: { product_code: data.product_code },
    })

    if (existing) {
        throw new Error(`Product code (${data.product_code}) already exists!`)
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

    return result
}