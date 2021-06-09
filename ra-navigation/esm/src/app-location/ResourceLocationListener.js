import { useEffect, useRef } from 'react';
import { useResourceAppLocation } from './useResourceAppLocation';
import { useAppLocationState } from './useAppLocationState';
import { DASHBOARD } from './constants';
import { defaultLocation } from './AppLocationContext';
/**
 * This component acts as a listener on changes in the resource location.
 * When the location of the resource changes, it modifies the location of the application accordingly.
 */
export var ResourceLocationListener = function (_a) {
    var _b = _a.hasDashboard, hasDashboard = _b === void 0 ? false : _b;
    var _c = useAppLocationState(), setLocation = _c[1];
    var resourceLocation = useResourceAppLocation();
    var currentResourceLocation = useRef(undefined);
    useEffect(function () {
        var _a = resourceLocation || defaultLocation, path = _a.path, values = _a.values;
        if (resourceLocation) {
            if (!path && hasDashboard) {
                // Set the location state to Dashboard when navigate to root url
                setLocation(DASHBOARD);
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
