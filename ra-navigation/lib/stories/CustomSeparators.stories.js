"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separators = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var breadcrumb_1 = require("../src/breadcrumb");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var app_location_1 = require("../src/app-location");
exports.default = { title: 'ra-navigation/Breadcrumb/Custom Separators' };
var Foo = function () {
    app_location_1.useDefineAppLocation('myhome.user.preferences');
    return null;
};
var MyLayout = function () {
    var items = (react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "myhome", label: "Home" },
        react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "user", label: "User" },
            react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "preferences", label: "Preferences" }))));
    return (react_1.default.createElement(app_location_1.AppLocationContext, null,
        react_1.default.createElement(breadcrumb_1.Breadcrumb, { separator: ">" }, items),
        react_1.default.createElement(breadcrumb_1.Breadcrumb, { separator: "/" }, items),
        react_1.default.createElement(breadcrumb_1.Breadcrumb, { separator: "\u27F9" }, items),
        react_1.default.createElement(breadcrumb_1.Breadcrumb, { separator: "\u25B6" }, items),
        react_1.default.createElement(breadcrumb_1.Breadcrumb, { separator: function () {
                return "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAYAAADzun+cAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AUPDygosjYtfwAAAh1JREFUOMul1c2LVnUUB/DPM/P4Ms2LL5OVFgrqUUuoqI0YJCRE1L5c2tKVoCuXbVpEi/6CELfiPyCBYLgSGxEi8wQp6VRkZk416UzP4+ZcuQzNzDPjgR8Xzv3d8z0v3++5IkJEWGiL+ZeyiNgRESPt7xaL0VnsQmZaqUXEZ+jhLKbQy8wnsdsxOy3ANdiFu5jFP4MCZmY/IrbjPczhJrbiIu5kZr8prgFvgEfwMY7hENZjU/nhIf5Fv949g3X1HMU8NmACX2bmbAG9i43VgX4DGhG61e4DeB8/Zea9Apu2Smu19nxEjOFtXMev7VZ38A5ewRs4iZnMnPOU1m5tROzBJK5k5qOhujOPP2s+r2FsKUYux/zG3wLt1iiO4BR06+5/uI1tNaedldlypGoCdzBUZ75NpsI4jM8xlZnH28CzeAG7i9kvRcR3RapGdu3TK6L1MYwXsb++P4N7ETFUnTuMj/A1vmiTSzF0dwU6gUvlv4WZqmSymD5RxLtVCbyJt7AXv+OriPgbrxfo2urohcy80XSqAe7i2dJwBz+XDnulyWlcQ8P4oQr2aslsApvxC7bULMfwY8U4mplz7UXSrSr/Kjn18Q2u4kGR7g8810qk0e8wHtWGGsf3tYQ+wbc4j8uZeXshw9sLZBwHq9L7+K1ZAgPK5sNK7uVK9HRm/vB/gAMvgQHvfhAR5yLi04gYXU2M1S6KfRHx/Er+bI8B6PTEJes65HYAAAAASUVORK5CYII=')";
            } }, items),
        react_1.default.createElement(Foo, null)));
};
exports.Separators = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "any" }))); };
