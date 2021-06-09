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
import { useMemo } from 'react';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import { useGetMany, useGetManyReference, } from 'react-admin';
import { UsingRegexp } from './constants';
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
var useReferenceManyToManyFieldController = function (_a) {
    var filter = _a.filter, record = _a.record, reference = _a.reference, resource = _a.resource, sort = _a.sort, _b = _a.source, source = _b === void 0 ? 'id' : _b, through = _a.through, using = _a.using, _c = _a.perPage, perPage = _c === void 0 ? 25 : _c, _d = _a.unique, unique = _d === void 0 ? true : _d;
    if (!using.match(UsingRegexp)) {
        throw new Error('useReferenceManyToManyFieldController incorrect `using` option format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`');
    }
    var _e = using.match(UsingRegexp), sourceField = _e[1], targetField = _e[2];
    // TODO: Introduce real pagination (setters, etc.)
    var page = 1;
    var throughManyReferences = useGetManyReference(through, sourceField, get(record, source), { page: page, perPage: perPage }, sort, filter, resource);
    var allReferencesIds = (throughManyReferences.ids || [])
        .map(function (id) {
        if (!throughManyReferences.data[id]) {
            return undefined;
        }
        return throughManyReferences.data[id][targetField];
    })
        .filter(function (id) { return !!id; });
    var referencesIds = unique
        ? uniq(allReferencesIds)
        : allReferencesIds;
    var references = useGetMany(reference, referencesIds);
    // Memoize the references data and only recompute them when they are reloaded
    var referencesData = useMemo(function () {
        return (references.data || [])
            .filter(function (v) { return !!v; })
            .reduce(function (acc, data) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[data.id] = data, _a)));
        }, {});
    }, [references.data]);
    return {
        basePath: "/" + reference,
        resource: reference,
        data: referencesData,
        ids: referencesIds,
        currentSort: sort,
        error: throughManyReferences.error || references.error,
        loading: throughManyReferences.loading || references.loading,
        loaded: throughManyReferences.loaded && references.loaded,
        total: throughManyReferences.total,
        page: page,
        perPage: perPage,
    };
};
export default useReferenceManyToManyFieldController;
