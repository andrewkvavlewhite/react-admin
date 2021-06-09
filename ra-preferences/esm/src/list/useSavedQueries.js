import usePreferences from '../usePreferences';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export var useSavedQueries = function (resource) {
    return usePreferences(resource + "SavedQueries", []);
};
