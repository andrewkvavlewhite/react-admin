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
import { useListContext } from 'react-admin';
import { Timeline } from './Timeline';
/**
 * A wrapper around the Timeline component which makes it usable directly inside a List.
 * @see Timeline
 */
export var TimelineList = function (props) {
    var _a = useListContext(), data = _a.data, ids = _a.ids, loaded = _a.loaded;
    var records = ids
        .map(function (id) { return data[id]; })
        .filter(function (record) { return record != undefined; });
    return React.createElement(Timeline, __assign({ records: records, loaded: loaded }, props));
};
