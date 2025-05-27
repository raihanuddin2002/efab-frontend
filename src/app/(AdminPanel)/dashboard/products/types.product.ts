import { Database } from "@/lib/supabase";
import { z } from "zod";

export type ProductType = Database['public']['Tables']['Product']['Row']

export const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    product_code: z.string().min(3, 'Code must be at least 3 characters long'),
    admin_price: z.string().optional(),
    selling_price: z.string().refine((value) => {
        if (!value) return false
        const num = Number(value)
        return !isNaN(num) && num >= 0
    }, 'Selling price is required'),
    regular_price: z.string().optional(),
    discount: z.string().optional(),
});

export type ProductFormValue = z.infer<typeof productSchema>;

// Type guard
export const isProductType = (value: unknown): value is ProductType => {
    if (!value || typeof value !== 'object') return false;

    const v = value as Record<string, unknown>;

    return (
        typeof v.name === 'string' &&
        typeof v.product_code === 'string' &&
        typeof v.selling_price === 'number'
    );
};

