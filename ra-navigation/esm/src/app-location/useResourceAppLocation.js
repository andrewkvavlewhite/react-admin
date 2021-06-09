import { useSelector, shallowEqual } from 'react-redux';
import { getResources } from 'react-admin';
import { useLocation } from 'react-router-dom';
import { resolveResourceLocationInfo, } from './resolveResourceLocationInfo';
var recordSelector = function (resource, id) { return function (state) {
    return state.admin.resources[resource] && state.admin.resources[resource].data[id];
}; };
var buildResourceLocationInfoPath = function (_a) {
    var resource = _a.resource, type = _a.type;
    return "" + resource + (type === 'list' ? '' : "." + type);
};
export var useResourceAppLocation = function () {
    var pathname = useLocation().pathname;
    var resources = useSelector(getResources, shallowEqual);
    // Since this can be null at mount, don't memoize it
    var resourceLocationInfo = resolveResourceLocationInfo(pathname, resources);
    var record = useSelector(resourceLocationInfo &&
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
