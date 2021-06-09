import { Record as RaRecord, SortPayload } from 'react-admin';
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
declare const useReferenceManyToManyFieldController: ({ filter, record, reference, resource, sort, source, through, using, perPage, unique, }: UseReferenceManyToManyFieldOptions) => UseReferenceManyToManyFieldValue;
export default useReferenceManyToManyFieldController;
