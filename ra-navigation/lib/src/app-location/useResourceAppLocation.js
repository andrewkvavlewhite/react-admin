"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResourceAppLocation = void 0;
var react_redux_1 = require("react-redux");
var react_admin_1 = require("react-admin");
var react_router_dom_1 = require("react-router-dom");
var resolveResourceLocationInfo_1 = require("./resolveResourceLocationInfo");
var recordSelector = function (resource, id) { return function (state) {
    return state.admin.resources[resource] && state.admin.resources[resource].data[id];
}; };
var buildResourceLocationInfoPath = function (_a) {
    var resource = _a.resource, type = _a.type;
    return "" + resource + (type === 'list' ? '' : "." + type);
};
exports.useResourceAppLocation = function () {
    var pathname = react_router_dom_1.useLocation().pathname;
    var resources = react_redux_1.useSelector(react_admin_1.getResources, react_redux_1.shallowEqual);
    // Since this can be null at mount, don't memoize it
    var resourceLocationInfo = resolveResourceLocationInfo_1.resolveResourceLocationInfo(pathname, resources);
    var record = react_redux_1.useSelector(resourceLocationInfo &&
        ['show', 'edit'].includes(resourceLocationInfo.type)
        ? recordSelector(resourceLocationInfo.resource, resourceLocationInfo.resourceId)
        : function () { return undefined; });
    if (pathname === '/') {
        return {
            path: '',
            values: {},
        };
    }
    return resourceLocationInfo
        ? {
            path: buildResourceLocationInfoPath(resourceLocationInfo),
            values: { record: record },
        }
        : null;
};
