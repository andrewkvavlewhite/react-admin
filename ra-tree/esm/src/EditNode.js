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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useEditController, EditView, EditContextProvider, } from 'react-admin';
import { expandNode } from './actions';
import NodeEditActions from './NodeEditActions';
/**
 * Alternative to <Edit> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
var EditNode = function (props) {
    var dispatch = useDispatch();
    useEffect(function () {
        dispatch(expandNode(props.resource, props.id));
    }, [dispatch, props.resource, props.id]);
    var controllerProps = useEditController(props);
    return (React.createElement(EditContextProvider, { value: controllerProps },
        React.createElement(EditView, __assign({}, props, { actions: defaultActions }, controllerProps))));
};
var defaultActions = React.createElement(NodeEditActions, null);
export default EditNode;
