import { ProductType } from "@/app/(AdminPanel)/dashboard/products/types.product"
import { supabaseBrowserClient } from "@/lib/supabase/browser-client"

export async function fetchProductsBrowser() {
    const { data: products, error } = await supabaseBrowserClient()
        .from("Product")
        .select()

    if (error) {
        console.error(error)
        throw new Error(error.message)
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
        throw new Error(error.message)
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
        throw new Error(error.message)
    }

    return product
}

export async function updateProductBrowser(data: ProductType) {
    const { data: product, error } = await supabaseBrowserClient()
        .from("Product")
        .update(data)
        .eq("id", data.id)
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error(error.message)
    }

    return product
}

export async function deleteProductBrowser(id: number) {
    const { data, error } = await supabaseBrowserClient()
        .from("Product")
        .delete()
        .eq("id", id)
        .select()


    if (error) {
        console.error(error)
        throw new Error(error.message)
    }

    return data[0]
}
