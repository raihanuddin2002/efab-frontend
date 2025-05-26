import { ProductFormValue, ProductType } from "@/app/(AdminPanel)/dashboard/products/types.product"
import { supabaseBrowserClient } from "@/lib/supabase/browser-client"

export async function fetchProductsBrowser() {
    const { data: products, error } = await supabaseBrowserClient()
        .from("Product")
        .select()

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch products')
    }

    return products
}

export async function fetchProductByCodeBrowser(product_code: string) {
    const { data: product, error } = await supabaseBrowserClient()
        .from("Product")
        .select()
        .eq("product_code", product_code)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch product')
    }

    return product
}

export async function createProductBrowser(data: ProductType) {
    const { data: product, error } = await supabaseBrowserClient()
        .from("Product")
        .insert([data])
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error('Failed to create product')
    }

    return product
}
