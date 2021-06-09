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
exports.EditActions = void 0;
var React = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_admin_1 = require("react-admin");
var layout_1 = require("../layout");
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, className = _a.className, hasList = _a.hasList, hasShow = _a.hasShow, hasEdit = _a.hasEdit, hasCreate = _a.hasCreate, resource = _a.resource, rest = __rest(_a, ["basePath", "className", "hasList", "hasShow", "hasEdit", "hasCreate", "resource"]);
    return rest;
};
/**
 * Action Toolbar for the Edit view
 *
 * Internal component. If you want to add or remove actions for a Edit view,
 * write your own EditActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pass a custom component.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { TopToolbar, Edit, ListButton } from 'react-admin';
 *
 *     const PostEditActions = ({ basePath }) => (
 *         <TopToolbar>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </TopToolbar>
 *     );
 *
 *     export const PostEdit = (props) => (
 *         <Edit actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Edit>
 *     );
 */
exports.EditActions = function (_a) {
    var _b = _a.breadcrumb, breadcrumb = _b === void 0 ? React.createElement(layout_1.Breadcrumb, { variant: "actions" }) : _b, className = _a.className, rest = __rest(_a, ["breadcrumb", "className"]);
    var _c = react_admin_1.useEditContext(rest), basePath = _c.basePath, record = _c.record;
    var hasShow = react_admin_1.useResourceDefinition(rest).hasShow;
    return (React.createElement(react_admin_1.TopToolbar, __assign({ className: className }, sanitizeRestProps(rest)),
        breadcrumb,
        hasShow && React.createElement(react_admin_1.ShowButton, { basePath: basePath, record: record })));
};
exports.EditActions.propTypes = {
    basePath: prop_types_1.default.string,
    breadcrumb: prop_types_1.default.element,
    className: prop_types_1.default.string,
    hasList: prop_types_1.default.bool,
};
