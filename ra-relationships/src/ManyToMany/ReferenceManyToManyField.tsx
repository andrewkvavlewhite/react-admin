import React, { ReactElement, ComponentType } from 'react';
import { Typography } from '@material-ui/core';
import {
    Record as RaRecord,
    SortPayload,
    ListContextProvider,
} from 'react-admin';

import useReferenceManyToManyFieldController from './useReferenceManyToManyFieldController';
import { UsingRegexp } from './constants';

/**
 * Fetch reference record through a relations table using fields.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the posts having the current tag as a datagrid
 *  <ReferenceManyToManyField
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <Datagrid>
 *          <TextField label="Title" source="title" />
 *          <TextField label="Body"  source="body" />
 *      </Datagrid>
 *  </ReferenceManyToManyField>
 *
 * @example Display all the tags of the current post as a SingleFieldList
 *  <ReferenceManyToManyField
 *      label="Tags"
 *      reference="tags"
 *      through="posts_tags"
 *      using={['post_id', 'tag_id']}
 *  >
 *      <SingleFieldList>
 *          <TextField label="name" source="name" />
 *      </Datagrid>
 *  </ReferenceManyToManyField>
 */
const ReferenceManyToManyField = ({
    reference,
    through,
    using,
    children,
    perPage,
    sort,
    sortBy, // eslint-disable-line
    source = 'id',
    ...props
}: ReferenceManyToManyFieldProps & InjectedProps): ReactElement => {
    if (!using.match(UsingRegexp)) {
        throw new Error(
            '<ReferenceManyToManyField> incorrect `using` props format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`'
        );
    }

    const {
        error,
        ...referenceManyToManyProps
    } = useReferenceManyToManyFieldController({
        filter: props.filter,
        perPage,
        record: props.record,
        resource: props.resource,
        reference,
        through,
        source,
        sort,
        using,
    });

    if (error) {
        return <Typography color="error">{error.message}</Typography>;
    }

    return (
        <ListContextProvider
            value={{
                ...referenceManyToManyProps,
                // Define default mandatory ListContextProps
                // These are not provided by useReferenceManyToManyFieldController
                displayedFilters: {},
                filterValues: {},
                hasCreate: false,
                onSelect: null,
                onToggleItem: null,
                onUnselectItems: null,
                hideFilter: null,
                selectedIds: [],
                setFilters: null,
                setPage: null,
                setPerPage: null,
                setSort: null,
                showFilter: null,
            }}
        >
            {children}
        </ListContextProvider>
    );
};

ReferenceManyToManyField.defaultProps = {
    sort: {
        field: 'id',
        order: 'DESC',
    },
};

export interface ReferenceManyToManyFieldProps {
    children: ReactElement;
    filter?: Record<string, unknown>;
    reference: string;
    perPage?: number;
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

export default ReferenceManyToManyField as ComponentType<
    ReferenceManyToManyFieldProps
>;
