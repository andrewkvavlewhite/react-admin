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
var react_1 = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var EditableDatagridBody_1 = __importDefault(require("./EditableDatagridBody"));
var EditRowButton_1 = __importDefault(require("./buttons/EditRowButton"));
var DeleteRowButton_1 = __importDefault(require("./buttons/DeleteRowButton"));
var CreateButton_1 = __importDefault(require("./buttons/CreateButton"));
var CreateResourceButton_1 = __importDefault(require("./buttons/CreateResourceButton"));
/**
 * Component to display and edit tabular data.
 *
 * To be used as child of <List> or <ReferenceManyField>.
 * The <EditableDatagrid> expects the same props as <Datagrid>, plus 4 more props:
 *
 * - editForm: a component to display instead of a row when the users edits a record
 * - createForm: a component to display as the first row when the user creates a record
 * - undoable: whether the edit and delete actions are undoable. Defaults to false.
 * - noDelete: disable the inline Delete button
 *
 * The component renders the editForm and createForm elements in a <table>, so they
 * should render a <tr>. We advise you to use <RowForm> for editForm and createForm.
 *
 * Note: No need to include an <EditButton> as child, the <EditableDatagrid>
 * component adds a column with edit/delete/save/cancel buttons itself.
 *
 * Note: To enable the create form in a <List>, you should add the `hasCreate`
 * prop to the <List> component.
 *
 * @example
 *
 *     const ArtistList = props => (
 *         <List {...props} hasCreate>
 *             <EditableDatagrid
 *                 undoable
 *                 createForm={<ArtistForm />}
 *                 editForm={<ArtistForm />}
 *             >
 *                 <TextField source="id" />
 *                 <TextField source="firstname" />
 *                 <TextField source="name" />
 *                 <DateField source="dob" label="born" />
 *                 <SelectField
 *                     source="prof"
 *                     label="Profession"
 *                     choices={professionChoices}
 *                 />
 *             </EditableDatagrid>
 *         </List>
 *     );
 *
 *     const ArtistForm: FC = props => (
 *         <RowForm {...props}>
 *             <TextField source="id" />
 *             <TextInput source="firstname" validate={required()} />
 *             <TextInput source="name" validate={required()} />
 *             <DateInput source="dob" label="born" validate={required()} />
 *             <SelectInput
 *                 source="prof"
 *                 label="Profession"
 *                 choices={professionChoices}
 *             />
 *         </RowForm>
 *     );
 *
 * @example // inside a <ReferenceManyField> - remember to set the foreign ket in the createForm using initialValues
 *
 *     const OrderEdit = ({ id, ...props }) => (
 *         <Edit {...props} id={id}>
 *             <SimpleForm>
 *                 <ReferenceManyField
 *                     fullWidth
 *                     label="Products"
 *                     reference="products"
 *                     target="order_id"
 *                 >
 *                     <EditableDatagrid
 *                         undoable
 *                         createForm={<ProductForm initialValues={{ order_id: id }} />}
 *                         editForm={<ProductForm />}
 *                     >
 *                         <TextField source="id" />
 *                         <TextField source="name" />
 *                         <NumberField source="price" label="Default Price" />
 *                         <DateField source="available_since" />
 *                     </EditableDatagrid>
 *                 </ReferenceManyField>
 *                 <DateInput source="purchase_date" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     const ProductForm = props => (
 *         <RowForm {...props}>
 *             <TextField source="id" disabled />
 *             <TextInput source="name" validate={required()} />
 *             <NumberInput
 *                 source="price"
 *                 label="Default Price"
 *                 validate={required()}
 *             />
 *             <DateInput source="available_since" validate={required()} />
 *         </RowForm>
 *     );
 *
 * @see Datagrid for the other props
 * @see RowForm for the create and edit form
 */
var EditableDatagrid = function (props) {
    var children = props.children, createForm = props.createForm, editForm = props.editForm, noDelete = props.noDelete, undoable = props.undoable, rest = __rest(props, ["children", "createForm", "editForm", "noDelete", "undoable"]);
    var classes = useStyles(emptyProps);
    var resource = react_admin_1.useResourceContext(props);
    var _a = react_1.useState(false), isStandaloneCreateFormVisible = _a[0], setShowStandaloneCreateForm = _a[1];
    var openStandaloneCreateForm = function () {
        setShowStandaloneCreateForm(true);
        // once the row is replaced by a form, focus the first input
        setTimeout(function () {
            var input = document.querySelectorAll('#new_record input')[0];
            input && input.focus && input.focus();
        }, 100); // FIXME not super robust
    };
    var closeStandaloneCreateForm = function () {
        setShowStandaloneCreateForm(false);
    };
    // If EditableDatagrid is in a List view, the create form is displayed based on the route
    // If not, the create form is displayed based on an internal state (see EditableDatagridBody)
    // In order to detect if we are in a List view, we check the props that are passed
    // We choose 'defaultTitle' since it's very unlikely to have this prop in a Reference field
    // Also, we don't want to have 'defaultTitle' in the Props type, to not confuse users
    var isInListView = rest.defaultTitle !== null;
    var hasStandaloneCreateForm = !isInListView && Boolean(createForm);
    var datagridBody = (react_1.default.createElement(EditableDatagridBody_1.default, { className: rest.className, closeStandaloneCreateForm: closeStandaloneCreateForm, createForm: createForm, editForm: editForm, expand: rest.expand, hasBulkActions: rest.hasBulkActions, hasStandaloneCreateForm: hasStandaloneCreateForm, isStandaloneCreateFormVisible: isStandaloneCreateFormVisible, undoable: undoable, basePath: rest.basePath }));
    // Since <Datagrid /> returns null when there's no data
    // We need to bypass it and display our datagrid by ourself
    if (rest.loaded && (rest.ids.length === 0 || rest.total === 0)) {
        return hasStandaloneCreateForm ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(CreateResourceButton_1.default, { onClick: openStandaloneCreateForm, resource: resource }),
            datagridBody)) : (datagridBody);
    }
    return (react_1.default.createElement(react_admin_1.Datagrid, __assign({ body: datagridBody, resource: resource }, rest),
        children,
        react_1.default.createElement(ActionsColumn, { headerClassName: classes.actionsColumn, cellClassName: classes.actionsColumn, undoable: undoable, noDelete: noDelete, redirect: isInListView ? 'list' : false, label: hasStandaloneCreateForm ? (react_1.default.createElement(CreateButton_1.default, { onClick: openStandaloneCreateForm })) : ('') })));
};
var useStyles = core_1.makeStyles({
    actionsColumn: {
        width: '5em',
    },
}, {
    name: 'RaEditableDatagrid',
});
var emptyProps = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var ActionsColumn = function (_a) {
    var 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    headerClassName = _a.headerClassName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cellClassName = _a.cellClassName, undoable = _a.undoable, noDelete = _a.noDelete, label = _a.label, props = __rest(_a, ["headerClassName", "cellClassName", "undoable", "noDelete", "label"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(EditRowButton_1.default, null),
        !noDelete && react_1.default.createElement(DeleteRowButton_1.default, __assign({ undoable: undoable }, props))));
};
exports.default = EditableDatagrid;
