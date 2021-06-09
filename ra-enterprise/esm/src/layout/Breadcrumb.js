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
import * as React from 'react';
import { Breadcrumb as DefaultBreadcrumb, ResourceBreadcrumbItems, } from '@react-admin/ra-navigation';
/**
 * A <Breadcrumb> component for ra-enterprise
 *
 */
var Breadcrumb = function (props) {
    return (React.createElement(DefaultBreadcrumb, __assign({}, props),
        React.createElement(ResourceBreadcrumbItems, null)));
};
Breadcrumb.defaultProps = {};
export default Breadcrumb;
