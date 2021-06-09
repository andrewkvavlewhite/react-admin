import React, {
    Children,
    cloneElement,
    FC,
    ReactElement,
    ComponentType,
} from 'react';
import { Typography } from '@material-ui/core';
import {
    Record as RaRecord,
    SortPayload,
    useInput,
    useTranslate,
} from 'react-admin';

import useReferenceManyToManyInputController from './useReferenceManyToManyInputController';
import { UsingRegexp } from './constants';

export interface ReferenceManyToManyInputProps {
    children: ReactElement;
    filter?: Record<string, unknown>;
    perPage?: number;
    reference: string;
    sort?: SortPayload;
    source?: string;
    through: string;
    using: string;
    [key: string]: any;
}

interface InjectedProps {
    basePath?: string;
    sort: SortPayload;
    record: RaRecord;
    resource: string;
}

/**
 * Allows to edit reference records through a relations table.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Allowing to pick the tags of a post using a SelectArrayInput
 *  <ReferenceManyToManyInput
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <SelectArrayInput optionText="name" />
 *  </ReferenceManyToManyInput>
 *
 * @example Allowing to pick the tags of a post using a CheckboxGroupInput
 *  <ReferenceManyToManyInput
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <CheckboxGroupInput optionText="name" />
 *  </ReferenceManyToManyInput>
 */
const ReferenceManyToManyInput: FC<
    ReferenceManyToManyInputProps & InjectedProps
> = ({
    basePath,
    children,
    className,
    id: idOverride,
    format,
    label,
    onBlur,
    onChange,
    onFocus,
    parse,
    perPage,
    record,
    reference,
    sort,
    source = 'id',
    through,
    using,
    validate,
    ...props
}) => {
    if (!using.match(UsingRegexp)) {
        throw new Error(
            '<ReferenceManyToManyInput> incorrect `using` props format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`'
        );
    }

    const { id, isRequired } = useInput({
        id: idOverride,
        onBlur,
        onChange,
        onFocus,
        source,
        validate,
        parse,
        format,
    });

    const {
        error,
        loading,
        loaded,
        choices,
        ...referenceManyToManyProps
    } = useReferenceManyToManyInputController({
        basePath,
        record,
        filter: props.filter,
        perPage,
        resource: props.resource,
        reference,
        through,
        source,
        sort,
        using,
        validate,
    });

    const translate = useTranslate();

    const translatedLabel = translate(
        label || `resources.${props.resource}.fields.${source}`,
        { _: label }
    );

    if (error) {
        return <Typography color="error">{error.message}</Typography>;
    }

    const childProps = {
        ...props,
        resource: reference,
        basePath: `/${reference}`,
        choices,
        id,
        input: referenceManyToManyProps.input,
        isRequired,
        label: translatedLabel,
        loading,
        loaded,
        meta: {
            ...referenceManyToManyProps.meta,
            helperText: false,
        },
        translateChoice: false,
        limitChoicesToValue: true,
        ...children.props,
    };

    return cloneElement(Children.only(children), childProps);
};

ReferenceManyToManyInput.defaultProps = {
    sort: {
        field: 'id',
        order: 'DESC',
    },
};

export default ReferenceManyToManyInput as ComponentType<
    ReferenceManyToManyInputProps
>;
