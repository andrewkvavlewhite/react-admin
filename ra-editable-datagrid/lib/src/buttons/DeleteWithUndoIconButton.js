"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var core_1 = require("@material-ui/core");
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var classnames_1 = __importDefault(require("classnames"));
var react_admin_1 = require("react-admin");
var useDeleteWithUndoController_1 = __importDefault(require("./useDeleteWithUndoController"));
var DeleteWithConfirmIconButton = function (_a) {
    var basePath = _a.basePath, className = _a.className, _b = _a.label, label = _b === void 0 ? 'ra.action.delete' : _b, record = _a.record, resource = _a.resource, _c = _a.redirect, redirectTo = _c === void 0 ? 'list' : _c;
    var _d = useDeleteWithUndoController_1.default({
        resource: resource,
        record: record,
        redirect: redirectTo,
        basePath: basePath,
    }), loading = _d.loading, handleDelete = _d.handleDelete;
    var translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(core_1.Tooltip, { title: translate(label, { _: label }) },
        react_1.default.createElement(core_1.IconButton, { disabled: loading, onClick: handleDelete, className: classnames_1.default('ra-delete-button', className), key: "button", size: "small" },
            react_1.default.createElement(Delete_1.default, { color: "error" }))));
};
DeleteWithConfirmIconButton.propTypes = {
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    confirmTitle: prop_types_1.default.string,
    confirmContent: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.any,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    resource: prop_types_1.default.string,
    icon: prop_types_1.default.element,
};
exports.default = DeleteWithConfirmIconButton;
