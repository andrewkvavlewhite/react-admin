import { createContext } from 'react';

export type ManyToManyReferenceInputOptions = {
    reference: string;
    resource: string;
    source: string;
    through: string;
    using: string;
};

type RegisterManyToManyInput = (
    options: ManyToManyReferenceInputOptions
) => void;

type UnregisterManyToManyInput = (
    options: ManyToManyReferenceInputOptions
) => void;

export interface ManyToManyReferenceContextValue {
    registerManyToManyInput: RegisterManyToManyInput;
    unregisterManyToManyInput: UnregisterManyToManyInput;
}

export const ManyToManyReferenceContext = createContext<
    ManyToManyReferenceContextValue
>(undefined);
