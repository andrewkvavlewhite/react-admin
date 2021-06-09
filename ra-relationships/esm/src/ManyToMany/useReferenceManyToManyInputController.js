var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useEffect, useState, useCallback } from 'react';
import { useField, useForm, } from 'react-final-form';
import { composeValidators, useGetList, useGetMany, useGetManyReference, } from 'react-admin';
import { UsingRegexp } from './constants';
import getReferenceManyToManyFormField from './getReferenceManyToManyFormField';
import { useManyToManyReferenceContext } from './useManyToManyReferenceContext';
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
var useReferenceManyToManyInputController = function (_a) {
    var record = _a.record, filter = _a.filter, _b = _a.perPage, perPage = _b === void 0 ? 25 : _b, reference = _a.reference, resource = _a.resource, sort = _a.sort, _c = _a.source, source = _c === void 0 ? 'id' : _c, through = _a.through, using = _a.using, validate = _a.validate;
    if (!using.match(UsingRegexp)) {
        throw new Error('useReferenceManyToManyFieldController incorrect `using` option format. `using` should be a string of two fields separated by a comma  such as `book_id,author_id`');
    }
    var _d = using.match(UsingRegexp), sourceField = _d[1], targetField = _d[2];
    // TODO: Introduce real pagination (setters, etc.)
    var page = 1;
    var throughManyReferences = useGetManyReference(through, sourceField, record.id, { page: page, perPage: perPage }, sort, filter, resource);
    // As the edited record does not contains the references in a many-to-many
    // relationship, we have to store them in a temporary field in the current form,
    // named according to the many-to-many configuration.
    // This field will be removed from the form values before the final submit
    var temporaryFieldName = getReferenceManyToManyFormField({
        reference: reference,
        resource: resource,
        through: through,
    });
    var _e = useState(undefined), temporaryFieldInitialValue = _e[0], setTemporaryFieldInitialValue = _e[1];
    var temporaryField = useField(temporaryFieldName, {
        // Artificial pristine / dirty system
        initialValue: temporaryFieldInitialValue || undefined,
        validate: composeValidators(validate),
    });
    var form = useForm();
    var referenceIdsEffectSignature = (throughManyReferences.ids || []).join(',');
    useEffect(function () {
        if (typeof throughManyReferences.ids === 'undefined') {
            return;
        }
        var referencesIds = (throughManyReferences.ids || []).reduce(function (acc, id) {
            if (throughManyReferences.data[id]) {
                var targetId = throughManyReferences.data[id][targetField];
                if (acc.indexOf(targetId) === -1) {
                    acc.push(targetId);
                }
            }
            return acc;
        }, []);
        if (typeof temporaryFieldInitialValue !== 'undefined') {
            form.change(temporaryFieldName, referencesIds);
            form.resetFieldState(temporaryFieldName);
        }
        else {
            setTemporaryFieldInitialValue(referencesIds);
        }
    } /* eslint-disable-next-line */, [referenceIdsEffectSignature, temporaryFieldName, form, targetField]);
    // Ensure the current references are loaded
    var references = useGetMany(reference, temporaryField.input.value || []);
    // Load all possible references
    var possibleValues = useGetList(reference, { page: 1, perPage: 25 }, sort, {});
    var choices = Object.values(possibleValues.data);
    var handleChange = useCallback(function (eventOrValue) {
        var value = eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue;
        form.change(temporaryFieldName, value);
        // This ensure the field is flagged as touched
        temporaryField.input.onBlur();
    }, [form, temporaryFieldName, temporaryField]);
    var value = temporaryField.input.value;
    var _f = useManyToManyReferenceContext(), registerManyToManyInput = _f.registerManyToManyInput, unregisterManyToManyInput = _f.unregisterManyToManyInput;
    useEffect(function () {
        registerManyToManyInput({
            resource: resource,
            reference: reference,
            source: source,
            through: through,
            using: using,
        });
        return function () {
            unregisterManyToManyInput({
                resource: resource,
                reference: reference,
                source: source,
                through: through,
                using: using,
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
        basePath: "/" + reference,
        resource: reference,
        choices: choices,
        input: __assign(__assign({}, temporaryField.input), { value: value, onChange: handleChange }),
        meta: temporaryField.meta,
        currentSort: sort,
        error: throughManyReferences.error ||
            references.error ||
            possibleValues.error,
        loading: throughManyReferences.loading ||
            references.loading ||
            possibleValues.loading,
        loaded: throughManyReferences.loaded &&
            references.loaded &&
            possibleValues.loaded,
        total: throughManyReferences.total,
        page: page,
        perPage: perPage,
    };
};
export default useReferenceManyToManyInputController;
