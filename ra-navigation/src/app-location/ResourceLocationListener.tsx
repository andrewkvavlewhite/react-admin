import { useEffect, useRef } from 'react';

import { useResourceAppLocation } from './useResourceAppLocation';
import { useAppLocationState } from './useAppLocationState';
import { DASHBOARD } from './constants';
import { defaultLocation, AppLocation } from './AppLocationContext';

/**
 * This component acts as a listener on changes in the resource location.
 * When the location of the resource changes, it modifies the location of the application accordingly.
 */
export const ResourceLocationListener = ({
    hasDashboard = false,
}: ResourceLocationListenerProps): null => {
    const [, setLocation] = useAppLocationState();
    const resourceLocation = useResourceAppLocation();
    const currentResourceLocation = useRef<AppLocation>(undefined);

    useEffect(() => {
        const { path, values } = resourceLocation || defaultLocation;
        if (resourceLocation) {
            if (!path && hasDashboard) {
                // Set the location state to Dashboard when navigate to root url
                setLocation(DASHBOARD);
            } else {
                setLocation(path, values);
            }
        } else if (currentResourceLocation.current) {
            // Reset the location state if the users navigated away from a resource page or the dashboard
            setLocation(null);
        }
        currentResourceLocation.current = resourceLocation;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(resourceLocation)]);

    return null;
};

export interface ResourceLocationListenerProps {
    hasDashboard?: boolean;
}
