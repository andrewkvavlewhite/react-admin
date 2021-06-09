/// <reference types="react" />
export declare type ManyToManyReferenceInputOptions = {
    reference: string;
    resource: string;
    source: string;
    through: string;
    using: string;
};
declare type RegisterManyToManyInput = (options: ManyToManyReferenceInputOptions) => void;
declare type UnregisterManyToManyInput = (options: ManyToManyReferenceInputOptions) => void;
export interface ManyToManyReferenceContextValue {
    registerManyToManyInput: RegisterManyToManyInput;
    unregisterManyToManyInput: UnregisterManyToManyInput;
}
export declare const ManyToManyReferenceContext: import("react").Context<ManyToManyReferenceContextValue>;
export {};
