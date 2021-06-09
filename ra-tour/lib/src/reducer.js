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
Object.defineProperty(exports, "__esModule", { value: true });
var reducer = function (state, action) {
    switch (action.type) {
        case 'start': {
            return __assign(__assign({}, state), { running: true, stepIndex: 0, activeTour: action.payload.tour });
        }
        case 'pause': {
            return __assign(__assign({}, state), { running: false });
        }
        case 'stop': {
            return __assign(__assign({}, state), { running: false, stepIndex: 0, activeTour: null });
        }
        case 'next': {
            if (!state.activeTour) {
                return state;
            }
            return __assign(__assign({}, state), { running: true, stepIndex: state.stepIndex + 1 });
        }
        case 'previous': {
            if (!state.activeTour) {
                return state;
            }
            if (state.stepIndex - 1 < 0) {
                return state;
            }
            return __assign(__assign({}, state), { running: true, stepIndex: state.stepIndex - 1 });
        }
        default: {
            throw new Error("Unhandled action type: " + action.type);
        }
    }
};
exports.default = reducer;
