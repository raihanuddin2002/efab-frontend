import CustomEditor from '@/components/editor/tinymce'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
    name: Path<T>
    maxLength?: number
    disabled?: boolean
    label?: string
    required?: boolean
}

export default function TextEditor<T extends FieldValues>({
    name,
    label,
    required,
    maxLength,
    disabled,
}: Props<T>) {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabel htmlFor={name} className='flex justify-start px-2'>
                            <span>{label}</span>
                            {required && <span className="ml-1 text-red-500">*</span>}
                        </FormLabel>
                    )}
                    <CustomEditor
                        data={field.value}
                        onChangeData={field.onChange}
                        maxLength={maxLength}
                        disabled={disabled}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
