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
var react_final_form_1 = require("react-final-form");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var SaveRowButton_1 = __importDefault(require("./buttons/SaveRowButton"));
var CancelEditButton_1 = __importDefault(require("./buttons/CancelEditButton"));
/**
 * A form to be rendered as a table row in an <EditableDatagrid>.
 *
 * All the props it expects are injected by <EditableDatagrid>. You should only
 * provide children to be rendered in each table cell.
 *
 * The children should be Input components, just like in a <SimpleForm>. You
 * can also pass a <Field> component as child.
 *
 * <RowForm> should have as many children as the <EditableDatagrid> that calls
 * it, or there will be a colSpan issue.
 *
 * @example
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
 * @see EditableDatagrid
 */
var RowForm = function (props) {
    var children = props.children, record = props.record, id = props.id, className = props.className, quitEditMode = props.quitEditMode, expand = props.expand, hasBulkActions = props.hasBulkActions, initialValues = props.initialValues, selectable = props.selectable, basePath = props.basePath, resource = props.resource, save = props.save, saving = props.saving, selected = props.selected, undoable = props.undoable, rest = __rest(props, ["children", "record", "id", "className", "quitEditMode", "expand", "hasBulkActions", "initialValues", "selectable", "basePath", "resource", "save", "saving", "selected", "undoable"]);
    var classes = useStyles(props);
    // handle submit by enter
    var onKeyDown = function (handleSubmit) { return function (evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            evt.stopPropagation();
            handleSubmit();
            quitEditMode();
        }
    }; };
    return (react_1.default.createElement(react_final_form_1.Form, __assign({ initialValues: __assign(__assign({}, initialValues), record), onSubmit: save }, rest), function (_a) {
        var handleSubmit = _a.handleSubmit, invalid = _a.invalid, dirty = _a.dirty;
        return (react_1.default.createElement(core_1.TableRow, { className: className, key: id, onKeyDown: onKeyDown(handleSubmit) },
            expand && (react_1.default.createElement(core_1.TableCell, { padding: "none" },
                react_1.default.createElement(react_admin_1.ExpandRowButton, { classes: rest.classes, expanded: false, disabled: true }))),
            hasBulkActions && (react_1.default.createElement(core_1.TableCell, { padding: "checkbox" }, selectable && (react_1.default.createElement(core_1.Checkbox, { color: "primary", checked: selected, disabled: true })))),
            react_1.default.Children.map(children, function (field, index) {
                return react_1.isValidElement(field) ? (react_1.default.createElement(core_1.TableCell, { key: index, className: field.props.cellClassName, align: field.props.textAlign }, react_1.cloneElement(field, {
                    record: record,
                    basePath: field.props.basePath || basePath,
                    resource: resource,
                }))) : null;
            }),
            react_1.default.createElement(core_1.TableCell, { className: classes.actionColumn },
                react_1.default.createElement(SaveRowButton_1.default, { dirty: dirty, handleSubmit: handleSubmit, invalid: invalid, quitEditMode: quitEditMode, saving: saving, undoable: undoable }),
                react_1.default.createElement(CancelEditButton_1.default, { cancel: quitEditMode }))));
    }));
};
var useStyles = core_1.makeStyles({
    actionColumn: {
        whiteSpace: 'nowrap',
        width: '5em',
    },
}, {
    name: 'RaRowForm',
});
exports.default = RowForm;
