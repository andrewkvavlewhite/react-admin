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
import { CreateView, CreateContextProvider } from 'react-admin';
import { useCreateNodeController } from './controllers';
/**
 * Alternative to <Create> for tree nodes.
 *
 * Upon creation, calls the dataProvider.addRootNode() or dataProvider.addChildNode()
 * (depending on the presence of a parentId in the location state) instead of
 * dataProvider.create().
 */
var CreateNode = function (props) {
    var controllerProps = useCreateNodeController(props);
    return (React.createElement(CreateContextProvider, { value: controllerProps },
        React.createElement(CreateView, __assign({}, props, controllerProps))));
};
export default CreateNode;
