"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterWithSave = void 0;
var React = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var FilterButtonWithSave_1 = require("./FilterButtonWithSave");
var useStyles = styles_1.makeStyles({
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
exports.FilterWithSave = function (props) {
    // Same code as react-admin's <Filter>, except it uses <FilterButtonWithSave> instead of `<FilterButton>`
    var classes = useStyles(props);
    var _a = react_admin_1.useListContext(props), resource = _a.resource, hideFilter = _a.hideFilter, setFilters = _a.setFilters, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues;
    var renderButton = function () {
        var classesOverride = props.classes, context = props.context, children = props.children, variant = props.variant, rest = __rest(props, ["classes", "context", "children", "variant"]);
        return (React.createElement(FilterButtonWithSave_1.FilterButtonWithSave, __assign({ className: classes.button, filters: React.Children.toArray(children) }, react_admin_1.sanitizeListRestProps(rest))));
    };
    var renderForm = function () {
        var classesOverride = props.classes, context = props.context, children = props.children, rest = __rest(props, ["classes", "context", "children"]);
        return (React.createElement(react_admin_1.FilterForm, __assign({ className: classes.form, resource: resource, filters: React.Children.toArray(children), hideFilter: hideFilter, displayedFilters: displayedFilters, initialValues: filterValues, setFilters: setFilters }, react_admin_1.sanitizeListRestProps(rest))));
    };
    return props.context === 'button' ? renderButton() : renderForm();
};
exports.FilterWithSave.propTypes = {
    children: prop_types_1.default.node,
    classes: prop_types_1.default.object,
    context: prop_types_1.default.oneOf(['form', 'button']),
};
