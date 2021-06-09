"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_admin_1 = require("react-admin");
var react_router_dom_1 = require("react-router-dom");
var EditableDatagridCreateForm = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, expand = _a.expand, hasBulkActions = _a.hasBulkActions, resource = _a.resource, createForm = _a.createForm, hasStandaloneCreateForm = _a.hasStandaloneCreateForm, isStandaloneCreateFormVisible = _a.isStandaloneCreateFormVisible, closeStandaloneCreateForm = _a.closeStandaloneCreateForm;
    var history = react_router_dom_1.useHistory();
    var notify = react_admin_1.useNotify();
    var refresh = react_admin_1.useRefresh();
    var _b = react_admin_1.useCreate(resource, {}), create = _b[0], saving = _b[1].loading;
    var hideCreateForm = function () {
        if (hasStandaloneCreateForm) {
            closeStandaloneCreateForm();
        }
        else {
            history.push(basePath);
        }
    };
    var doCreate = react_1.useCallback(function (data) {
        return create({ payload: { data: data } }, {
            action: react_admin_1.CRUD_CREATE,
            onSuccess: function () {
                notify('ra.notification.created', 'info', {
                    smart_count: 1,
                });
                hideCreateForm();
                refresh();
            },
            onFailure: function (error) {
                notify(typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error', 'warning');
            },
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [create, notify, basePath]);
    var createFormElement = react_1.cloneElement(createForm, {
        classes: classes,
        expand: expand,
        hasBulkActions: hasBulkActions,
        id: 'new_record',
        quitEditMode: hideCreateForm,
        record: {},
        resource: resource,
        basePath: basePath,
        save: doCreate,
        saving: saving,
        selectable: false,
    });
    if (hasStandaloneCreateForm) {
        // create form triggered by state
        return isStandaloneCreateFormVisible && createFormElement;
    }
    // create form in a route
    return react_1.default.createElement(react_router_dom_1.Route, { path: basePath + "/create" }, createFormElement);
};
EditableDatagridCreateForm.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.any,
    expand: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.elementType]),
    hasBulkActions: prop_types_1.default.bool.isRequired,
    resource: prop_types_1.default.string,
    createForm: prop_types_1.default.element,
    hasStandaloneCreateForm: prop_types_1.default.bool,
    isStandaloneCreateFormVisible: prop_types_1.default.bool.isRequired,
    closeStandaloneCreateForm: prop_types_1.default.func.isRequired,
};
exports.default = EditableDatagridCreateForm;
