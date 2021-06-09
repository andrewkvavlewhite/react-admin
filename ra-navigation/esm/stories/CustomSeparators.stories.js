/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import { Breadcrumb, BreadcrumbItem } from '../src/breadcrumb';
import dataProvider from './dataProvider';
import { AppLocationContext, useDefineAppLocation } from '../src/app-location';
export default { title: 'ra-navigation/Breadcrumb/Custom Separators' };
var Foo = function () {
    useDefineAppLocation('myhome.user.preferences');
    return null;
};
var MyLayout = function () {
    var items = (React.createElement(BreadcrumbItem, { name: "myhome", label: "Home" },
        React.createElement(BreadcrumbItem, { name: "user", label: "User" },
            React.createElement(BreadcrumbItem, { name: "preferences", label: "Preferences" }))));
    return (React.createElement(AppLocationContext, null,
        React.createElement(Breadcrumb, { separator: ">" }, items),
        React.createElement(Breadcrumb, { separator: "/" }, items),
        React.createElement(Breadcrumb, { separator: "\u27F9" }, items),
        React.createElement(Breadcrumb, { separator: "\u25B6" }, items),
        React.createElement(Breadcrumb, { separator: function () {
                return "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAYAAADzun+cAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AUPDygosjYtfwAAAh1JREFUOMul1c2LVnUUB/DPM/P4Ms2LL5OVFgrqUUuoqI0YJCRE1L5c2tKVoCuXbVpEi/6CELfiPyCBYLgSGxEi8wQp6VRkZk416UzP4+ZcuQzNzDPjgR8Xzv3d8z0v3++5IkJEWGiL+ZeyiNgRESPt7xaL0VnsQmZaqUXEZ+jhLKbQy8wnsdsxOy3ANdiFu5jFP4MCZmY/IrbjPczhJrbiIu5kZr8prgFvgEfwMY7hENZjU/nhIf5Fv949g3X1HMU8NmACX2bmbAG9i43VgX4DGhG61e4DeB8/Zea9Apu2Smu19nxEjOFtXMev7VZ38A5ewRs4iZnMnPOU1m5tROzBJK5k5qOhujOPP2s+r2FsKUYux/zG3wLt1iiO4BR06+5/uI1tNaedldlypGoCdzBUZ75NpsI4jM8xlZnH28CzeAG7i9kvRcR3RapGdu3TK6L1MYwXsb++P4N7ETFUnTuMj/A1vmiTSzF0dwU6gUvlv4WZqmSymD5RxLtVCbyJt7AXv+OriPgbrxfo2urohcy80XSqAe7i2dJwBz+XDnulyWlcQ8P4oQr2aslsApvxC7bULMfwY8U4mplz7UXSrSr/Kjn18Q2u4kGR7g8810qk0e8wHtWGGsf3tYQ+wbc4j8uZeXshw9sLZBwHq9L7+K1ZAgPK5sNK7uVK9HRm/vB/gAMvgQHvfhAR5yLi04gYXU2M1S6KfRHx/Er+bI8B6PTEJes65HYAAAAASUVORK5CYII=')";
            } }, items),
        React.createElement(Foo, null)));
};
export var Separators = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "any" }))); };
