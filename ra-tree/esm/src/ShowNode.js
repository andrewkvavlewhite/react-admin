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
import { useShowController, ShowView } from 'react-admin';
import { expandNode } from './actions';
/**
 * Alternative to <Show> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
var ShowNode = function (props) {
    var dispatch = useDispatch();
    useEffect(function () {
        dispatch(expandNode(props.resource, props.id));
    }, [dispatch, props.resource, props.id]);
    return React.createElement(ShowView, __assign({}, props, useShowController(props)));
};
export default ShowNode;
