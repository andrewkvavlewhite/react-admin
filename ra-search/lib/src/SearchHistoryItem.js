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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryItem = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
/**
 * A component responsible for displaying a single search history item.
 *
 * @param props {SearchHistoryItemProps}
 * @param props.item {string} The history item
 * @param props.onSelect {Function} The function to call when the item is selected.
 */
exports.SearchHistoryItem = function (props) {
    var item = props.item, onSelect = props.onSelect, rest = __rest(props, ["item", "onSelect"]);
    if (!item) {
        return null;
    }
    var handleClick = function () {
        onSelect(item);
    };
    var handleKeyEnter = function (event) {
        if (event.ctrlKey && event.keyCode == '13') {
            onSelect(item);
        }
    };
    return (React.createElement(core_1.ListItem, __assign({ button: true, component: InnerComponent, onClick: handleClick, onKeyPress: handleKeyEnter }, rest),
        React.createElement(core_1.ListItemText, { primary: item })));
};
var InnerComponent = function (_a) {
    var children = _a.children, rest = __rest(_a, ["children"]);
    return (React.createElement("div", __assign({}, rest), children));
};
