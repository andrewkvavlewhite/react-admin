"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var PostAdd_1 = __importDefault(require("@material-ui/icons/PostAdd"));
var react_redux_1 = require("react-redux");
var UnlockButton = function (_a) {
    var lock = _a.lock, props = __rest(_a, ["lock"]);
    var dispatch = react_redux_1.useDispatch();
    var dataProvider = react_admin_1.useDataProvider();
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
    return (react_1.default.createElement(react_admin_1.Button, __assign({ color: "primary", onClick: handleClick, label: "Unlock Post" }, props),
        react_1.default.createElement(PostAdd_1.default, null)));
};
exports.default = UnlockButton;
