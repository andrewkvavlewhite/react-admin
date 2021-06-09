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
import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { sanitizeListRestProps, useListContext, FilterForm, } from 'react-admin';
import { FilterButtonWithSave } from './FilterButtonWithSave';
var useStyles = makeStyles({
    button: {},
    form: {},
}, { name: 'RaFilter' });
/**
 * <Filter> alternative offering the ability to save queries.
 *
 * Use this component instead of <Filter> to let users store custom queries
 * that they can reuse later. The saved queries will appear as MenuItems in the
 * FilterMenu dropdown, and can be removed.
 *
 * This component uses usePreference under the hood to store saved queries in
 * localStorage, one set of saved queries per resource.
 *
 * @example
 *
 * import { FilterWithSave } from '@react-admin/ra-preferences';
 *
 * const SongFilter: FC = props => (
 *     <FilterWithSave {...props}>
 *         <SelectInput
 *             choices={[
 *                 { id: 'Apple', name: 'Apple' },
 *                 { id: 'Atlantic', name: 'Atlantic' },
 *                 { id: 'Capitol', name: 'Capitol' },
 *                 { id: 'Chess', name: 'Chess' },
 *                 { id: 'Columbia', name: 'Columbia' },
 *                 { id: 'DGC', name: 'DGC' },
 *                 { id: 'London', name: 'London' },
 *                 { id: 'Tamla', name: 'Tamla' },
 *             ]}
 *             source="recordCompany"
 *         />
 *         <DateInput source="released_gte" label="Released after" />
 *         <DateInput source="released_lte" label="Released before" />
 *     </FilterWithSave>
 * );
 *
 * const SongList: FC<Props> = props => (
 *     <List {...props} filters={<SongFilter />}>
 *         <Datagrid rowClick="edit">
 *             <TextField source="title" />
 *             <TextField source="artist" />
 *             <TextField source="writer" />
 *             <TextField source="producer" />
 *             <TextField source="recordCompany" />
 *             <NumberField source="rank" />
 *             <DateField source="released" />
 *         </Datagrid>
 *     </List>
 * );
 */
export var FilterWithSave = function (props) {
    // Same code as react-admin's <Filter>, except it uses <FilterButtonWithSave> instead of `<FilterButton>`
    var classes = useStyles(props);
    var _a = useListContext(props), resource = _a.resource, hideFilter = _a.hideFilter, setFilters = _a.setFilters, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues;
    var renderButton = function () {
        var classesOverride = props.classes, context = props.context, children = props.children, variant = props.variant, rest = __rest(props, ["classes", "context", "children", "variant"]);
        return (React.createElement(FilterButtonWithSave, __assign({ className: classes.button, filters: React.Children.toArray(children) }, sanitizeListRestProps(rest))));
    };
    var renderForm = function () {
        var classesOverride = props.classes, context = props.context, children = props.children, rest = __rest(props, ["classes", "context", "children"]);
        return (React.createElement(FilterForm, __assign({ className: classes.form, resource: resource, filters: React.Children.toArray(children), hideFilter: hideFilter, displayedFilters: displayedFilters, initialValues: filterValues, setFilters: setFilters }, sanitizeListRestProps(rest))));
    };
    return props.context === 'button' ? renderButton() : renderForm();
};
FilterWithSave.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    context: PropTypes.oneOf(['form', 'button']),
};
