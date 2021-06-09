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
import { ListContextProvider, useCheckMinimumRequiredProps, useListController, } from 'react-admin';
import { ListView } from './ListView';
export var List = function (props) {
    useCheckMinimumRequiredProps('List', ['children'], props);
    var controllerProps = useListController(props);
    return (React.createElement(ListContextProvider, { value: controllerProps },
        React.createElement(ListView, __assign({}, props, controllerProps))));
};
