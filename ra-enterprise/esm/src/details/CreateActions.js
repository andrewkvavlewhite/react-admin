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
import * as React from 'react';
import PropTypes from 'prop-types';
import { TopToolbar, ListButton, useCreateContext, useResourceDefinition, } from 'react-admin';
import { Breadcrumb } from '../layout';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, className = _a.className, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, resource = _a.resource, rest = __rest(_a, ["basePath", "className", "hasCreate", "hasEdit", "hasList", "hasShow", "resource"]);
    return rest;
};
/**
 * Action Toolbar for the Create view
 *
 * Internal component. If you want to add or remove actions for a Create view,
 * write your own CreateActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pass a custom component.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { TopToolbar, Create, ListButton } from 'react-admin';
 *
 *     const PostCreateActions = ({ basePath }) => (
 *         <TopToolbar>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </TopToolbar>
 *     );
 *
 *     export const PostCreate = (props) => (
 *         <Create actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Create>
 *     );
 */
export var CreateActions = function (_a) {
    var _b = _a.breadcrumb, breadcrumb = _b === void 0 ? React.createElement(Breadcrumb, { variant: "actions" }) : _b, className = _a.className, rest = __rest(_a, ["breadcrumb", "className"]);
    var basePath = useCreateContext(rest).basePath;
    var hasList = useResourceDefinition(rest).hasList;
    return (React.createElement(TopToolbar, __assign({ className: className }, sanitizeRestProps(rest)),
        breadcrumb,
        hasList && React.createElement(ListButton, { basePath: basePath })));
};
CreateActions.propTypes = {
    basePath: PropTypes.string,
    breadcrumb: PropTypes.element,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};
