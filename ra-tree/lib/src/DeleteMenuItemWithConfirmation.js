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
var prop_types_1 = __importDefault(require("prop-types"));
var core_1 = require("@material-ui/core");
var inflection_1 = __importDefault(require("inflection"));
var react_admin_1 = require("react-admin");
var controllers_1 = require("./controllers");
var DeleteMenuItemWithConfirmation = react_1.forwardRef(function (_a, ref) {
    var basePath = _a.basePath, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classesOverride = _a.classes, className = _a.className, _b = _a.confirmTitle, confirmTitle = _b === void 0 ? 'ra.message.delete_title' : _b, _c = _a.confirmContent, confirmContent = _c === void 0 ? 'ra.message.delete_content' : _c, _d = _a.label, label = _d === void 0 ? 'ra.action.delete' : _d, record = _a.record, resource = _a.resource, _e = _a.redirect, redirectTo = _e === void 0 ? 'list' : _e, props = __rest(_a, ["basePath", "classes", "className", "confirmTitle", "confirmContent", "label", "record", "resource", "redirect"]);
    var _f = controllers_1.useDeleteBranchWithConfirmController({
        record: record,
        resource: resource,
        redirect: redirectTo,
        basePath: basePath,
    }), open = _f.open, loading = _f.loading, handleDialogOpen = _f.handleDialogOpen, handleDialogClose = _f.handleDialogClose, handleDelete = _f.handleDelete;
    var translate = react_admin_1.useTranslate();
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.MenuItem, __assign({ className: className, onClick: handleDialogOpen, ref: ref }, props), translate(label, { _: label })),
        React.createElement(react_admin_1.Confirm, { isOpen: open, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                name: inflection_1.default.humanize(translate("resources." + resource + ".name", {
                    smart_count: 1,
                    _: inflection_1.default.singularize(resource),
                }), true),
                id: record.id,
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
});
DeleteMenuItemWithConfirmation.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.any,
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
};
exports.default = DeleteMenuItemWithConfirmation;
