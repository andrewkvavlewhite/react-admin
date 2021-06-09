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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Typography } from '@material-ui/core';
import { ListContextProvider, } from 'react-admin';
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
var ReferenceManyToManyField = function (_a) {
    var reference = _a.reference, through = _a.through, using = _a.using, children = _a.children, perPage = _a.perPage, sort = _a.sort, sortBy = _a.sortBy, // eslint-disable-line
    _b = _a.source, // eslint-disable-line
    source = _b === void 0 ? 'id' : _b, props = __rest(_a, ["reference", "through", "using", "children", "perPage", "sort", "sortBy", "source"]);
    if (!using.match(UsingRegexp)) {
        throw new Error('<ReferenceManyToManyField> incorrect `using` props format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`');
    }
    var _c = useReferenceManyToManyFieldController({
        filter: props.filter,
        perPage: perPage,
        record: props.record,
        resource: props.resource,
        reference: reference,
        through: through,
        source: source,
        sort: sort,
        using: using,
    }), error = _c.error, referenceManyToManyProps = __rest(_c, ["error"]);
    if (error) {
        return React.createElement(Typography, { color: "error" }, error.message);
    }
    return (React.createElement(ListContextProvider, { value: __assign(__assign({}, referenceManyToManyProps), { 
            // Define default mandatory ListContextProps
            // These are not provided by useReferenceManyToManyFieldController
            displayedFilters: {}, filterValues: {}, hasCreate: false, onSelect: null, onToggleItem: null, onUnselectItems: null, hideFilter: null, selectedIds: [], setFilters: null, setPage: null, setPerPage: null, setSort: null, showFilter: null }) }, children));
};
ReferenceManyToManyField.defaultProps = {
    sort: {
        field: 'id',
        order: 'DESC',
    },
};
export default ReferenceManyToManyField;
