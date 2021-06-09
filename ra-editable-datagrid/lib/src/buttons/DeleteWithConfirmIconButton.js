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
var core_1 = require("@material-ui/core");
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var classnames_1 = __importDefault(require("classnames"));
var inflection_1 = __importDefault(require("inflection"));
var react_admin_1 = require("react-admin");
var useDeleteWithConfirmController_1 = __importDefault(require("./useDeleteWithConfirmController"));
var DeleteWithConfirmIconButton = function (_a) {
    var basePath = _a.basePath, className = _a.className, _b = _a.confirmTitle, confirmTitle = _b === void 0 ? 'ra.message.delete_title' : _b, _c = _a.confirmContent, confirmContent = _c === void 0 ? 'ra.message.delete_content' : _c, _d = _a.label, label = _d === void 0 ? 'ra.action.delete' : _d, record = _a.record, resource = _a.resource, _e = _a.redirect, redirectTo = _e === void 0 ? 'list' : _e;
    var _f = useDeleteWithConfirmController_1.default({
        resource: resource,
        record: record,
        redirect: redirectTo,
        basePath: basePath,
    }), open = _f.open, loading = _f.loading, handleClick = _f.handleClick, handleDialogClose = _f.handleDialogClose, handleDelete = _f.handleDelete;
    var translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(core_1.Tooltip, { title: translate(label, { _: label }) },
            react_1.default.createElement(core_1.IconButton, { onClick: handleClick, className: classnames_1.default('ra-delete-button', className), key: "button", size: "small" },
                react_1.default.createElement(Delete_1.default, { color: "error" }))),
        react_1.default.createElement(react_admin_1.Confirm, { isOpen: open, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                name: inflection_1.default.humanize(translate("resources." + resource + ".name", {
                    smart_count: 1,
                    _: inflection_1.default.singularize(resource),
                }), true),
                id: record ? record.id : undefined,
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
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
