/**
 * Returns a ResourceLocationInfo object from a pathname and an array of resources metadatas
 *
 * @param {string} pathname Router's slash separated location
 * @param {Object[]} resources
 * @param {string} resources[].name Name of the resource (eg: songs)
 * @param {boolean} resources[].hasList Does the resource implement a list view?
 * @param {boolean} resources[].hasEdit Does the resource implement an edit view?
 * @param {boolean} resources[].hasCreate Does the resource implement a create view?
 * @param {boolean} resources[].hasShow Does the resource implement a show view?
 *
 * @returns {?ResourceLocationInfo} The resource location metadata or null
 */
export var resolveResourceLocationInfo = function (pathname, resources) {
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        var name_1 = resource.name;
        if (pathname === "/" + name_1) {
            return { resource: name_1, type: 'list' };
        }
        if (pathname === "/" + name_1 + "/create") {
            return { resource: name_1, type: 'create' };
        }
        var showMatch = pathname.match(new RegExp("^/" + name_1 + "/(.*?)/show$"));
        if (showMatch) {
            return { resource: name_1, type: 'show', resourceId: showMatch[1] };
        }
        var matchEdit = pathname.match(new RegExp("^/" + name_1 + "/([^/]*)"));
        if (matchEdit) {
            return { resource: name_1, type: 'edit', resourceId: matchEdit[1] };
        }
    }
    return null;
};
