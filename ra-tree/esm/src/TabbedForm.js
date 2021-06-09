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
import { TabbedForm as RaTabbedForm } from 'react-admin';
import Toolbar from './Toolbar';
var TabbedForm = function (props) { return (React.createElement(RaTabbedForm, __assign({ toolbar: React.createElement(Toolbar, null) }, props))); };
export default TabbedForm;
