"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceLocationListener = void 0;
var react_1 = require("react");
var useResourceAppLocation_1 = require("./useResourceAppLocation");
var useAppLocationState_1 = require("./useAppLocationState");
var constants_1 = require("./constants");
var AppLocationContext_1 = require("./AppLocationContext");
/**
 * This component acts as a listener on changes in the resource location.
 * When the location of the resource changes, it modifies the location of the application accordingly.
 */
exports.ResourceLocationListener = function (_a) {
    var _b = _a.hasDashboard, hasDashboard = _b === void 0 ? false : _b;
    var _c = useAppLocationState_1.useAppLocationState(), setLocation = _c[1];
    var resourceLocation = useResourceAppLocation_1.useResourceAppLocation();
    var currentResourceLocation = react_1.useRef(undefined);
    react_1.useEffect(function () {
        var _a = resourceLocation || AppLocationContext_1.defaultLocation, path = _a.path, values = _a.values;
        if (resourceLocation) {
            if (!path && hasDashboard) {
                // Set the location state to Dashboard when navigate to root url
                setLocation(constants_1.DASHBOARD);
            }
            else {
                setLocation(path, values);
            }
        }
        else if (currentResourceLocation.current) {
            // Reset the location state if the users navigated away from a resource page or the dashboard
            setLocation(null);
        }
        currentResourceLocation.current = resourceLocation;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(resourceLocation)]);
    return null;
};
