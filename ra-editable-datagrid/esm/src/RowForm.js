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
import React, { isValidElement, cloneElement, } from 'react';
import { Form } from 'react-final-form';
import { ExpandRowButton, } from 'react-admin';
import { TableRow, TableCell, Checkbox, makeStyles } from '@material-ui/core';
import SaveRowButton from './buttons/SaveRowButton';
import CancelEditButton from './buttons/CancelEditButton';
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
    return (React.createElement(Form, __assign({ initialValues: __assign(__assign({}, initialValues), record), onSubmit: save }, rest), function (_a) {
        var handleSubmit = _a.handleSubmit, invalid = _a.invalid, dirty = _a.dirty;
        return (React.createElement(TableRow, { className: className, key: id, onKeyDown: onKeyDown(handleSubmit) },
            expand && (React.createElement(TableCell, { padding: "none" },
                React.createElement(ExpandRowButton, { classes: rest.classes, expanded: false, disabled: true }))),
            hasBulkActions && (React.createElement(TableCell, { padding: "checkbox" }, selectable && (React.createElement(Checkbox, { color: "primary", checked: selected, disabled: true })))),
            React.Children.map(children, function (field, index) {
                return isValidElement(field) ? (React.createElement(TableCell, { key: index, className: field.props.cellClassName, align: field.props.textAlign }, cloneElement(field, {
                    record: record,
                    basePath: field.props.basePath || basePath,
                    resource: resource,
                }))) : null;
            }),
            React.createElement(TableCell, { className: classes.actionColumn },
                React.createElement(SaveRowButton, { dirty: dirty, handleSubmit: handleSubmit, invalid: invalid, quitEditMode: quitEditMode, saving: saving, undoable: undoable }),
                React.createElement(CancelEditButton, { cancel: quitEditMode }))));
    }));
};
var useStyles = makeStyles({
    actionColumn: {
        whiteSpace: 'nowrap',
        width: '5em',
    },
}, {
    name: 'RaRowForm',
});
export default RowForm;
