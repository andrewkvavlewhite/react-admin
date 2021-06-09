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
exports.Custom = void 0;
var react_1 = __importDefault(require("react"));
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var react_admin_1 = require("react-admin");
var react_final_form_1 = require("react-final-form");
var core_1 = require("@material-ui/core");
var history_1 = require("history");
var src_1 = require("../src");
exports.default = { title: 'ra-editable-datagrid/Custom Form' };
var dataProvider = ra_data_fakerest_1.default({
    artists: [
        {
            id: 1,
            name: 'Mercury',
            firstname: 'Freddy',
            dob: new Date('1946-09-05'),
            prof: 'singer',
        },
        {
            id: 2,
            name: 'John',
            firstname: 'Elton',
            dob: new Date('1947-03-25'),
            prof: 'singer',
        },
        {
            id: 3,
            name: 'Collins',
            firstname: 'Phil',
            dob: new Date('1951-01-30'),
            prof: 'singer',
        },
        {
            id: 4,
            name: 'Ford',
            firstname: 'Harrison',
            dob: new Date('1942-07-13'),
            prof: 'actor',
        },
        {
            id: 5,
            name: 'Streep',
            firstname: 'Meryl',
            dob: new Date('1949-06-22'),
            prof: 'actor',
        },
    ],
    events: [],
    performances: [],
}, true);
var professionChoices = [
    { id: 'actor', name: 'Actor' },
    { id: 'singer', name: 'Singer' },
    { id: 'other', name: 'Other' },
];
var ArtistForm = function (props) {
    var record = props.record, id = props.id, className = props.className, quitEditMode = props.quitEditMode, selectable = props.selectable, basePath = props.basePath, resource = props.resource, save = props.save, saving = props.saving, selected = props.selected, undoable = props.undoable, rest = __rest(props, ["record", "id", "className", "quitEditMode", "selectable", "basePath", "resource", "save", "saving", "selected", "undoable"]);
    return (react_1.default.createElement(react_final_form_1.Form, __assign({ initialValues: __assign({ firstname: 'John', name: 'Doe' }, record), onSubmit: save }, rest), function (_a) {
        var handleSubmit = _a.handleSubmit, invalid = _a.invalid, dirty = _a.dirty;
        return (react_1.default.createElement(core_1.TableRow, { className: className, key: id, style: { backgroundColor: '#ffe' } },
            react_1.default.createElement(core_1.TableCell, { padding: "checkbox" }, selectable && (react_1.default.createElement(core_1.Checkbox, { color: "primary", checked: selected, disabled: true }))),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "id", record: record, resource: resource, basePath: basePath })),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "firstname", validate: react_admin_1.required(), record: record, resource: resource, basePath: basePath, helperText: false })),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "name", validate: react_admin_1.required(), record: record, resource: resource, basePath: basePath, helperText: false })),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "born", validate: react_admin_1.required(), record: record, resource: resource, basePath: basePath, helperText: false })),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(react_admin_1.SelectInput, { source: "prof", label: "Profession", choices: professionChoices, record: record, resource: resource, basePath: basePath, helperText: false })),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(src_1.SaveRowButton, { dirty: dirty, handleSubmit: handleSubmit, invalid: invalid, quitEditMode: quitEditMode, saving: saving, undoable: undoable }),
                react_1.default.createElement(src_1.CancelEditButton, { cancel: quitEditMode }))));
    }));
};
var useStyles = core_1.makeStyles({
    id: {
        width: '4em',
    },
    textField: {
        width: '14em',
    },
    dateField: {
        width: '14em',
    },
});
var ArtistList = function (props) {
    var classes = useStyles(props);
    return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
        react_1.default.createElement(src_1.EditableDatagrid, { undoable: true, createForm: react_1.default.createElement(ArtistForm, null), editForm: react_1.default.createElement(ArtistForm, null), rowClick: "edit" },
            react_1.default.createElement(react_admin_1.TextField, { source: "id", cellClassName: classes.id }),
            react_1.default.createElement(react_admin_1.TextField, { source: "firstname", cellClassName: classes.textField }),
            react_1.default.createElement(react_admin_1.TextField, { source: "name", cellClassName: classes.textField }),
            react_1.default.createElement(react_admin_1.DateField, { source: "dob", label: "born", cellClassName: classes.dateField }),
            react_1.default.createElement(react_admin_1.SelectField, { source: "prof", label: "Profession", choices: professionChoices }))));
};
exports.Custom = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList }))); };
