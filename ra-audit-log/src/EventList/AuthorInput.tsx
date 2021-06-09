import * as React from 'react';
import { ReactElement } from 'react';
import {
    AutocompleteInput,
    InputProps,
    ReferenceInput,
    TextInput,
} from 'react-admin';

/**
 * A react-admin input allowing to filter events by author. Should be included in a List filter.
 * If the events authors have a dedicated resource, an AutoCompleteInput will be used to select them.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filter-buttonform-combo|Filter}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { AuthorInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <AuthorInput
 *                 // source is required by react-admin but it won't be used by the AuthorInput
 *                 source="author"
 *                 // You should specify a label which can be a translation key
 *                 label="Authors"
 *             />
 *         </Filter>
 *     );
 * };
 *
 * @example <caption>With an author resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { AuthorInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <AuthorInput
 *                 // source is required by react-admin but it won't be used by the AuthorInput
 *                 source="author"
 *                 // You should specify a label which can be a translation key
 *                 label="Authors"
 *                 authorResource="users"
 *             />
 *         </Filter>
 *     );
 * };
 */
export const AuthorInput = (props: AuthorInputProps): ReactElement => {
    const { authorResource, className, source, ...rest } = props;

    if (authorResource) {
        return (
            <ReferenceInput
                reference={authorResource}
                source="author.id"
                {...rest}
            >
                <AutocompleteInput
                    className={className}
                    optionText="fullName"
                    resettable
                />
            </ReferenceInput>
        );
    }
    return (
        <TextInput
            source="author.fullName"
            className={className}
            resettable
            {...rest}
        />
    );
};

export interface AuthorInputProps extends Omit<InputProps, 'source'> {
    authorResource?: string;
}
