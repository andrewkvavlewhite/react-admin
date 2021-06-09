import { useMemo } from 'react';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import {
    Record as RaRecord,
    SortPayload,
    useGetMany,
    useGetManyReference,
    Identifier,
} from 'react-admin';

import { UsingRegexp } from './constants';

export interface UseReferenceManyToManyFieldOptions {
    filter?: Record<string, unknown>;
    perPage?: number;
    record: RaRecord;
    reference: string;
    resource: string;
    sort: SortPayload;
    source?: string;
    through: string;
    using: string;
    unique?: boolean;
}

/**
 * @typedef ReferenceArrayProps
 * @type {Object}
 * @property {number} basePath the basePath of the reference.
 * @property {Object} currentSort The current sort parameters (field & order).
 * @property {Object} data Object holding the reference data by their ids
 * @property {Object} error the error returned by the dataProvider
 * @property {Array} ids the list of ids.
 * @property {boolean} loading is the reference currently loading
 * @property {boolean} loaded has the reference already been loaded
 * @property {number} page The currently displayed page
 * @property {number} perPage The number of items displayed on a single page
 * @property {number} total The total number of items matching the current filters
 */
export interface UseReferenceManyToManyFieldValue {
    basePath: string;
    currentSort: SortPayload;
    data: any;
    error?: Error;
    ids: any;
    loaded: boolean;
    loading: boolean;
    page: number;
    perPage: number;
    resource: string;
    total: number;
}

/**
 * Hook that fetches records from another resource in a many to many scenario implemented with an associative resource.
 *
 * @example
 *
 * const { ids, data, error, loaded, loading, total } = useReferenceArrayFieldController({
 *      record: { id: 1, name: 'Eric Clapton' },
 *      reference: 'events',
 *      resource: 'artists',
 *      sort: { field: 'name', order: 'ASC' },
 *      source: 'id',
 *      through: 'performances',
 *      using: 'artist_id,event_id'
 * });
 *
 * @param {Object} options
 * @param {boolean} options.filter Filters to send with the request
 * @param {Object} options.record The current resource record
 * @param {string} options.reference The linked resource name
 * @param {string} options.resource The current resource name
 * @param {Object} options.sort The sort parameters
 * @param {string} options.sort.field The field used for sorting
 * @param {string} options.sort.order The sort order (asc, desc)
 * @param {string} options.source The key of the linked resource identifier
 * @param {string} options.through The name of the associative resource
 * @param {string} options.using A comma separated list of two field names which are the ids of the two linked resource in the associative resource
 * @param {boolean} options.unique Remove duplicates from the target table. defaults to true.
 *
 * @returns {ReferenceArrayProps} The reference props
 */
const useReferenceManyToManyFieldController = ({
    filter,
    record,
    reference,
    resource,
    sort,
    source = 'id',
    through,
    using,
    perPage = 25,
    unique = true,
}: UseReferenceManyToManyFieldOptions): UseReferenceManyToManyFieldValue => {
    if (!using.match(UsingRegexp)) {
        throw new Error(
            'useReferenceManyToManyFieldController incorrect `using` option format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`'
        );
    }

    const [, sourceField, targetField] = using.match(UsingRegexp);

    // TODO: Introduce real pagination (setters, etc.)
    const page = 1;
    const throughManyReferences = useGetManyReference(
        through,
        sourceField,
        get(record, source),
        { page, perPage },
        sort,
        filter,
        resource
    );

    const allReferencesIds = (throughManyReferences.ids || [])
        .map(id => {
            if (!throughManyReferences.data[id]) {
                return undefined;
            }
            return throughManyReferences.data[id][targetField];
        })
        .filter(id => !!id);

    const referencesIds: Identifier[] = unique
        ? uniq(allReferencesIds)
        : allReferencesIds;

    const references = useGetMany(reference, referencesIds);

    // Memoize the references data and only recompute them when they are reloaded
    const referencesData = useMemo(
        () =>
            (references.data || [])
                .filter(v => !!v)
                .reduce((acc, data) => ({ ...acc, [data.id]: data }), {}),
        [references.data]
    );

    return {
        basePath: `/${reference}`,
        resource: reference,
        data: referencesData,
        ids: referencesIds,
        currentSort: sort,
        error: throughManyReferences.error || references.error,
        loading: throughManyReferences.loading || references.loading,
        loaded: throughManyReferences.loaded && references.loaded,
        total: throughManyReferences.total,
        page,
        perPage,
    };
};

export default useReferenceManyToManyFieldController;
