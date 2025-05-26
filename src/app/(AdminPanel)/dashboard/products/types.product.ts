import { Database } from "@/lib/supabase";
import { z } from "zod";

export type ProductType = Database['public']['Tables']['Product']['Row']

export const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    product_code: z.string().min(0, 'Code must be at least 3 characters long').optional(),
    admin_price: z.coerce.number().min(0, 'Admin price must be at least 0').optional(),
    selling_price: z.coerce.number().min(0, 'Selling price must be at least 0'),
    regular_price: z.coerce.number().min(0, 'Regular price must be at least 0').optional(),
    discount: z.coerce.number().min(0, 'Discount must be at least 0').optional(),
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

