import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { Record as RaRecord, SortPayload, Validator } from 'react-admin';
export interface ReferenceManyToManyInputOptions {
    basePath: string;
    record: RaRecord;
    filter?: Record<string, unknown>;
    perPage?: number;
    reference: string;
    resource: string;
    sort: SortPayload;
    source?: string;
    through: string;
    using: string;
    validate?: Validator | Validator[];
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
interface ReferenceManyToManyInputProps {
    basePath: string;
    currentSort: SortPayload;
    choices: RaRecord[];
    error?: Error;
    loaded: boolean;
    loading: boolean;
    page: number;
    perPage: number;
    resource: string;
    total: number;
    input: Partial<FieldInputProps<any>>;
    meta: FieldMetaState<any>;
}
/**
 * Hook that fetches records from another resource in a many to many scenario implemented with an associative resource.
 *
 * @example
 *
 * const { ids, data, error, loaded, loading, total } = useReferenceManyToManyInputController({
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
 * @param {string} options.reference The linked resource name
 * @param {string} options.resource The current resource name
 * @param {Object} options.sort The sort parameters
 * @param {string} options.sort.field The field used for sorting
 * @param {string} options.sort.order The sort order (asc, desc)
 * @param {string} options.source The key of the linked resource identifier
 * @param {string} options.through The name of the associative resource
 * @param {string} options.using A comma separated list of two field names which are the ids of the two linked resource in the associative resource
 *
 * @returns {ReferenceArrayProps} The reference props
 */
declare const useReferenceManyToManyInputController: ({ record, filter, perPage, reference, resource, sort, source, through, using, validate, }: ReferenceManyToManyInputOptions) => ReferenceManyToManyInputProps;
export default useReferenceManyToManyInputController;
