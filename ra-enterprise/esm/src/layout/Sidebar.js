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
import React from 'react';
import { Sidebar as DefaultSidebar } from 'react-admin';
/**
 * A <Sidebar> component for @react-admin/ra-enterprise
 *
 */
function Sidebar(props) {
    return React.createElement(DefaultSidebar, __assign({ size: 200 }, props));
}
export default Sidebar;
