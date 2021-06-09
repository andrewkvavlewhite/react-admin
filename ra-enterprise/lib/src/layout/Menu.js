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
var prop_types_1 = __importDefault(require("prop-types"));
var react_redux_1 = require("react-redux");
var Dashboard_1 = __importDefault(require("@material-ui/icons/Dashboard"));
var inflection_1 = __importDefault(require("inflection"));
var ViewList_1 = __importDefault(require("@material-ui/icons/ViewList"));
var react_admin_1 = require("react-admin");
var ra_navigation_1 = require("@react-admin/ra-navigation");
var translatedResourceName = function (resource, translate) {
    return translate("resources." + resource.name + ".name", {
        smart_count: 2,
        _: resource.options && resource.options.label
            ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
            })
            : inflection_1.default.humanize(inflection_1.default.pluralize(resource.name)),
    });
};
var Menu = function (_a) {
    var hasDashboard = _a.hasDashboard;
    var translate = react_admin_1.useTranslate();
    var resources = react_redux_1.useSelector(react_admin_1.getResources, react_redux_1.shallowEqual);
    return (React.createElement(ra_navigation_1.MultiLevelMenu, { variant: "categories" },
        hasDashboard && (React.createElement(ra_navigation_1.MenuItemCategory, { name: "dashboard", to: "/", exact: true, label: "Dashboard", icon: React.createElement(Dashboard_1.default, null) })),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (React.createElement(ra_navigation_1.MenuItemCategory, { key: resource.name, name: resource.name, to: "/" + resource.name, exact: true, label: translatedResourceName(resource, translate), icon: resource.icon ? React.createElement(resource.icon, null) : React.createElement(ViewList_1.default, null) })); })));
};
Menu.propTypes = {
    hasDashboard: prop_types_1.default.bool,
};
exports.default = Menu;
