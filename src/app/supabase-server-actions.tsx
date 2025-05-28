import { supabaseServerClient } from "@/lib/supabase"

export const getSession = async () => {
    const supabase = await supabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
}

export async function fetchProductsServer(sort: "asc" | "desc" = "desc") {
    const supabase = await supabaseServerClient()
    const { data: products, error } = await supabase
        .from("Product")
        .select()
        .order("created_at", { ascending: sort === "asc" })

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch products')
    }

    return products
}

export async function fetchProductByIdServer(id: number) {
    const supabase = await supabaseServerClient()
    const { data: product, error } = await supabase
        .from("Product")
        .select()
        .eq("id", id)
        .single()

    if (error) {
        console.error(error)
        throw new Error(error.message)
    }

    return product
}
