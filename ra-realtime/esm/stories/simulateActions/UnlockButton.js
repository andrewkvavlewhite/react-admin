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
import React from 'react';
import { Button, useDataProvider, } from 'react-admin';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useDispatch } from 'react-redux';
var UnlockButton = function (_a) {
    var lock = _a.lock, props = __rest(_a, ["lock"]);
    var dispatch = useDispatch();
    var dataProvider = useDataProvider();
    var resource = lock.resource, recordId = lock.recordId, identity = lock.identity;
    var handleClick = function () {
        dataProvider
            .unlock(resource, {
            resource: resource,
            recordId: recordId,
            identity: identity,
        })
            .then(function () {
            dispatch({
                type: 'RA/UNLOCK',
                payload: {
                    data: { recordId: recordId },
                },
                meta: {
                    fetchResponse: 'RA/UNLOCK',
                    resource: resource,
                    recordId: recordId,
                },
            });
        });
    };
    return (React.createElement(Button, __assign({ color: "primary", onClick: handleClick, label: "Unlock Post" }, props),
        React.createElement(PostAddIcon, null)));
};
export default UnlockButton;
