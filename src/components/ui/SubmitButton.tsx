import React, { useRef } from 'react'
import { useFormStatus } from 'react-dom';
import toastify from '@/lib/tostify';
import { Button } from './button';

type SubmitButtonProps = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SubmitButton({ children, disabled, onClick, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    const toastId = useRef('');

    if (pending) {
        if (toastId.current) toastify.dismiss(toastId.current);
        toastId.current = toastify.loading("Please wait...");
    }
    else toastify.dismiss(toastId.current)

    return (
        <Button
            type='submit'
            className='mt-10'
            onClick={onClick}
            disabled={disabled || pending}
            {...props}
        >
            {children}{pending && "..."}
        </Button>
    )
}
