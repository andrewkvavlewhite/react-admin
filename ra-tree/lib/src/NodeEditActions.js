"use strict";
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
var react_admin_1 = require("react-admin");
var react_router_dom_1 = require("react-router-dom");
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
var NodeEditActions = function (_a) {
    var basePath = _a.basePath, data = _a.data;
    return (React.createElement(react_admin_1.TopToolbar, null,
        React.createElement(react_admin_1.Button, { component: react_router_dom_1.Link, to: {
                pathname: basePath + "/create",
                state: { parentId: data === null || data === void 0 ? void 0 : data.id },
            }, label: "ra-tree.action.add_child" },
            React.createElement(Add_1.default, null))));
};
exports.default = NodeEditActions;
