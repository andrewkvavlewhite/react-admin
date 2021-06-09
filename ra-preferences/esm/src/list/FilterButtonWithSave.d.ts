import { ReactNode, ReactElement, HtmlHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { ClassesOverride } from 'react-admin';
declare const useStyles: (props?: any) => Record<"root", string>;
export declare const FilterButtonWithSave: {
    (props: FilterButtonWithSaveProps): ReactElement;
    propTypes: {
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        filters: PropTypes.Validator<PropTypes.ReactNodeLike[]>;
    };
};
export interface FilterButtonWithSaveProps extends HtmlHTMLAttributes<HTMLDivElement> {
    classes?: ClassesOverride<typeof useStyles>;
    className?: string;
    filters: ReactNode[];
}
export {};
