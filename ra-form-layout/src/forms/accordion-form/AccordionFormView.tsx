import * as React from 'react';
import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import get from 'lodash/get';
import { FormWithRedirectRenderProps } from 'react-admin';
import AccordionFormToolbar from './AccordionFormToolbar';

export const AccordionFormView = ({
    autoClose = false,
    basePath,
    children,
    className,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    margin,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter = true,
    toolbar = DefaultToolbar,
    undoable,
    variant,
}: AccordionFormViewProps) => {
    const childrens = Children.toArray(children);
    const [expanded, setExpanded] = React.useState<string | false>(
        childrens.length > 0 ? (childrens[0] as ReactElement).props.label : ''
    );

    const handleChange = (panel: string) => (
        event: React.ChangeEvent<unknown>,
        isExpanded: boolean
    ): void => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <form>
            <div className={className}>
                {Children.map(children, (accordion: ReactElement) =>
                    React.cloneElement(accordion, {
                        basePath,
                        autoClose,
                        expanded: expanded === accordion.props.label,
                        margin,
                        onChange: handleChange(accordion.props.label),
                        record,
                        resource,
                        variant,
                    })
                )}
            </div>
            {toolbar &&
                React.cloneElement(toolbar, {
                    basePath,
                    handleSubmitWithRedirect,
                    handleSubmit,
                    invalid,
                    pristine,
                    record,
                    redirect,
                    resource,
                    saving,
                    submitOnEnter,
                    undoable,
                })}
        </form>
    );
};

const DefaultToolbar = <AccordionFormToolbar />;

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

export const findAccordionsWithErrors = (
    children: ReactNode,
    errors
): string[] =>
    Children.toArray(children).reduce<string[]>((acc, child) => {
        if (!isValidElement(child)) {
            return acc;
        }

        const inputs = Children.toArray(child.props.children);

        if (
            inputs.some(
                input =>
                    isValidElement(input) && get(errors, input.props.source)
            )
        ) {
            return [...acc, child.props.label as string];
        }

        return acc;
    }, []);
