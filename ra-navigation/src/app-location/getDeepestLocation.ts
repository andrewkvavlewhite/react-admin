import { AppLocation } from './AppLocationContext';

export const getDeepestLocation = (locations: AppLocation[]): AppLocation => {
    const result = locations.reduce((currentLocation, location) => {
        if (currentLocation) {
            const currentLocationLength = currentLocation.path
                ? currentLocation.path.split('.').length
                : 0;
            const locationLength = location.path
                ? location.path.split('.').length
                : 0;

            if (currentLocationLength > locationLength) {
                return currentLocation;
            }

            if (locationLength > currentLocationLength) {
                return location;
            }

            if (currentLocation.path) {
                return currentLocation;
            }
        }

        return location;
    }, undefined as AppLocation);

    return result;
};
