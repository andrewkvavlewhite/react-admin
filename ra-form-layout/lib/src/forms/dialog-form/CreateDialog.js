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
var React = __importStar(require("react"));
var react_1 = require("react");
var react_router_1 = require("react-router");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var FormDialogTitle_1 = __importDefault(require("./FormDialogTitle"));
/**
 * A component which displays a creation form inside a dialog.
 *
 * @param {CreateDialogProps} props
 * @param {string} props.title The dialog's title. It accepts a translation key.
 *
 * @example
 * const PostList = props => (
 *     <>
 *         <List {...props}>
 *             <Datagrid>
 *                 ...
 *             </Datagrid>
 *         </List>
 *         <CreateDialog {...props}>
 *             <SimpleForm>
 *                 <TextField source="id" />
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </SimpleForm>
 *         </CreateDialog>
 *     </>
 * );
 */
var CreateDialog = function (props) {
    var basePath = props.basePath;
    return (React.createElement(react_router_1.Route, { path: basePath + "/create" }, function (_a) {
        var match = _a.match;
        return (React.createElement(CreateDialogView, __assign({ open: !!match }, props)));
    }));
};
var CreateDialogView = function (_a) {
    var children = _a.children, open = _a.open, title = _a.title, props = __rest(_a, ["children", "open", "title"]);
    var controllerProps = react_admin_1.useCreateController(props);
    var redirect = react_admin_1.useRedirect();
    var basePath = controllerProps.basePath, defaultTitle = controllerProps.defaultTitle, record = controllerProps.record, redirectTo = controllerProps.redirect, resource = controllerProps.resource, save = controllerProps.save, saving = controllerProps.saving, version = controllerProps.version;
    var handleClose = function () {
        redirect(basePath);
    };
    return (React.createElement(core_1.Dialog, __assign({ open: open, "aria-labelledby": "create-dialog-title", onClose: handleClose }, sanitizeRestProps(props)),
        React.createElement(FormDialogTitle_1.default, { id: "create-dialog-title", title: title, defaultTitle: defaultTitle, record: record, onClose: handleClose }),
        React.createElement(react_admin_1.CreateContextProvider, { value: controllerProps }, react_1.cloneElement(react_1.Children.only(children), {
            basePath: basePath,
            record: record,
            redirect: typeof children.props.redirect === 'undefined'
                ? redirectTo
                : children.props.redirect,
            resource: resource,
            save: save,
            saving: saving,
            version: version,
        }))));
};
/* eslint-disable @typescript-eslint/no-unused-vars */
var sanitizeRestProps = function (_a) {
    var _b = _a.basePath, basePath = _b === void 0 ? null : _b, _c = _a.hasCreate, hasCreate = _c === void 0 ? null : _c, _d = _a.hasEdit, hasEdit = _d === void 0 ? null : _d, _e = _a.hasList, hasList = _e === void 0 ? null : _e, _f = _a.hasShow, hasShow = _f === void 0 ? null : _f, _g = _a.history, history = _g === void 0 ? null : _g, _h = _a.loaded, loaded = _h === void 0 ? null : _h, _j = _a.loading, loading = _j === void 0 ? null : _j, _k = _a.location, location = _k === void 0 ? null : _k, _l = _a.match, match = _l === void 0 ? null : _l, _m = _a.onFailure, onFailure = _m === void 0 ? null : _m, _o = _a.onSuccess, onSuccess = _o === void 0 ? null : _o, _p = _a.options, options = _p === void 0 ? null : _p, _q = _a.permissions, permissions = _q === void 0 ? null : _q, _r = _a.transform, transform = _r === void 0 ? null : _r, rest = __rest(_a, ["basePath", "hasCreate", "hasEdit", "hasList", "hasShow", "history", "loaded", "loading", "location", "match", "onFailure", "onSuccess", "options", "permissions", "transform"]);
    return rest;
};
/* eslint-enable @typescript-eslint/no-unused-vars */
exports.default = CreateDialog;
