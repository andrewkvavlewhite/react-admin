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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_admin_1 = require("react-admin");
var actions_1 = require("./actions");
var NodeEditActions_1 = __importDefault(require("./NodeEditActions"));
/**
 * Alternative to <Edit> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
var EditNode = function (props) {
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(actions_1.expandNode(props.resource, props.id));
    }, [dispatch, props.resource, props.id]);
    var controllerProps = react_admin_1.useEditController(props);
    return (React.createElement(react_admin_1.EditContextProvider, { value: controllerProps },
        React.createElement(react_admin_1.EditView, __assign({}, props, { actions: defaultActions }, controllerProps))));
};
var defaultActions = React.createElement(NodeEditActions_1.default, null);
exports.default = EditNode;
