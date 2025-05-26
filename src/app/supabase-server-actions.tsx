import { supabaseServerClient } from "@/lib/supabase"
import { ProductType } from "./(AdminPanel)/dashboard/products/types.product"

export const getSession = async () => {
    const supabase = await supabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
}

export async function fetchProductsServer() {
    const supabase = await supabaseServerClient()
    const { data: products, error } = await supabase.from("Product").select()

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch products')
    }

    return products
}
