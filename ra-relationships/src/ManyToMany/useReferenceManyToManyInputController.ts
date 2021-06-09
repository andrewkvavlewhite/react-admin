import { useEffect, useState, useCallback } from 'react';
import {
    useField,
    useForm,
    FieldInputProps,
    FieldMetaState,
} from 'react-final-form';
import {
    composeValidators,
    Record as RaRecord,
    SortPayload,
    useGetList,
    useGetMany,
    useGetManyReference,
    Validator,
} from 'react-admin';

import { UsingRegexp } from './constants';
import getReferenceManyToManyFormField from './getReferenceManyToManyFormField';
import { useManyToManyReferenceContext } from './useManyToManyReferenceContext';

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
const useReferenceManyToManyInputController = ({
    record,
    filter,
    perPage = 25,
    reference,
    resource,
    sort,
    source = 'id',
    through,
    using,
    validate,
}: ReferenceManyToManyInputOptions): ReferenceManyToManyInputProps => {
    if (!using.match(UsingRegexp)) {
        throw new Error(
            'useReferenceManyToManyFieldController incorrect `using` option format. `using` should be a string of two fields separated by a comma  such as `book_id,author_id`'
        );
    }

    const [, sourceField, targetField] = using.match(UsingRegexp);
    // TODO: Introduce real pagination (setters, etc.)
    const page = 1;

    const throughManyReferences = useGetManyReference(
        through,
        sourceField,
        record.id,
        { page, perPage },
        sort,
        filter,
        resource
    );

    // As the edited record does not contains the references in a many-to-many
    // relationship, we have to store them in a temporary field in the current form,
    // named according to the many-to-many configuration.
    // This field will be removed from the form values before the final submit
    const temporaryFieldName = getReferenceManyToManyFormField({
        reference,
        resource,
        through,
    });
    const [
        temporaryFieldInitialValue,
        setTemporaryFieldInitialValue,
    ] = useState(undefined);
    const temporaryField = useField(temporaryFieldName, {
        // Artificial pristine / dirty system
        initialValue: temporaryFieldInitialValue || undefined,
        validate: composeValidators(validate),
    });

    const form = useForm();
    const referenceIdsEffectSignature = (throughManyReferences.ids || []).join(
        ','
    );

    useEffect(
        () => {
            if (typeof throughManyReferences.ids === 'undefined') {
                return;
            }

            const referencesIds = (throughManyReferences.ids || []).reduce(
                (acc, id) => {
                    if (throughManyReferences.data[id]) {
                        const targetId =
                            throughManyReferences.data[id][targetField];
                        if (acc.indexOf(targetId) === -1) {
                            acc.push(targetId);
                        }
                    }

                    return acc;
                },
                []
            );

            if (typeof temporaryFieldInitialValue !== 'undefined') {
                form.change(temporaryFieldName, referencesIds);
                form.resetFieldState(temporaryFieldName);
            } else {
                setTemporaryFieldInitialValue(referencesIds);
            }
        } /* eslint-disable-next-line */,
        [referenceIdsEffectSignature, temporaryFieldName, form, targetField]
    );

    // Ensure the current references are loaded
    const references = useGetMany(reference, temporaryField.input.value || []);

    // Load all possible references
    const possibleValues = useGetList(
        reference,
        { page: 1, perPage: 25 },
        sort,
        {}
    );

    const choices: RaRecord[] = Object.values(possibleValues.data);

    const handleChange = useCallback(
        (eventOrValue: any) => {
            const value = eventOrValue.target
                ? eventOrValue.target.value
                : eventOrValue;

            form.change(temporaryFieldName, value);
            // This ensure the field is flagged as touched
            temporaryField.input.onBlur();
        },
        [form, temporaryFieldName, temporaryField]
    );
    const value = temporaryField.input.value;

    const {
        registerManyToManyInput,
        unregisterManyToManyInput,
    } = useManyToManyReferenceContext();

    useEffect(() => {
        registerManyToManyInput({
            resource,
            reference,
            source,
            through,
            using,
        });

        return () => {
            unregisterManyToManyInput({
                resource,
                reference,
                source,
                through,
                using,
            });
        };
    }, [
        resource,
        reference,
        source,
        through,
        using,
        registerManyToManyInput,
        unregisterManyToManyInput,
    ]);
    return {
        basePath: `/${reference}`,
        resource: reference,
        choices,
        input: {
            ...temporaryField.input,
            value,
            onChange: handleChange,
        },
        meta: temporaryField.meta,
        currentSort: sort,
        error:
            throughManyReferences.error ||
            references.error ||
            possibleValues.error,
        loading:
            throughManyReferences.loading ||
            references.loading ||
            possibleValues.loading,
        loaded:
            throughManyReferences.loaded &&
            references.loaded &&
            possibleValues.loaded,
        total: throughManyReferences.total,
        page,
        perPage,
    };
};

export default useReferenceManyToManyInputController;
