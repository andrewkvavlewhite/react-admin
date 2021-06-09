import { ReactElement, ReactNode } from 'react';
import { FormWithRedirectRenderProps } from 'react-admin';
export declare const AccordionFormView: ({ autoClose, basePath, children, className, handleSubmit, handleSubmitWithRedirect, invalid, margin, pristine, record, redirect, resource, saving, submitOnEnter, toolbar, undoable, variant, }: AccordionFormViewProps) => JSX.Element;
export interface AccordionFormViewProps extends FormWithRedirectRenderProps {
    autoClose?: boolean;
    basePath?: string;
    children?: ReactNode;
    className?: string;
    margin?: 'none' | 'normal' | 'dense';
    resource?: string;
    submitOnEnter?: boolean;
    toolbar?: ReactElement;
    undoable?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
}
export declare const findAccordionsWithErrors: (children: ReactNode, errors: any) => string[];
