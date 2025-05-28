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
