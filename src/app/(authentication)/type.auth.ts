import { UserFormValue } from "./signup/page";

// type guard
export const isUserType = (value: unknown): value is UserFormValue => {
    if (!value || typeof value !== 'object') return false;

    const v = value as Record<string, unknown>;

    return (
        typeof v.name === 'string' &&
        typeof v.email === 'string' &&
        typeof v.password === 'string'
    );
};