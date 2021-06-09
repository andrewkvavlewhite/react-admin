export var getDeepestLocation = function (locations) {
    var result = locations.reduce(function (currentLocation, location) {
        if (currentLocation) {
            var currentLocationLength = currentLocation.path
                ? currentLocation.path.split('.').length
                : 0;
            var locationLength = location.path
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
    }, undefined);
    return result;
};
