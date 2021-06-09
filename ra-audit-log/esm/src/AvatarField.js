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
import { useRecordContext } from 'react-admin';
import get from 'lodash/get';
import { EventAvatar } from './EventAvatar';
/**
 * A react-admin field which displays the avatar of an event author.
 */
export var AvatarField = function (props) {
    var record = useRecordContext(props);
    var _a = props.source, source = _a === void 0 ? 'avatar' : _a, _b = props.fullNameSource, fullNameSource = _b === void 0 ? 'fullName' : _b, rest = __rest(props, ["source", "fullNameSource"]);
    var src = get(record, source);
    var fullName = get(record, fullNameSource);
    if (!record) {
        return null;
    }
    return (React.createElement(EventAvatar, __assign({ src: src, fullName: fullName, role: "presentation" }, rest)));
};
