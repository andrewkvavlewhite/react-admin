export type ResourceLocationInfo = {
    type: 'show' | 'create' | 'edit' | 'list';
    resource: string;
    resourceId?: any;
};

export type ResourceInfo = {
    name: string;
    hasList: boolean;
    hasEdit: boolean;
    hasCreate: boolean;
    hasShow: boolean;
};
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
export const resolveResourceLocationInfo = (
    pathname: string,
    resources: ResourceInfo[]
): ResourceLocationInfo | null => {
    for (const resource of resources) {
        const { name } = resource;

        if (pathname === `/${name}`) {
            return { resource: name, type: 'list' };
        }

        if (pathname === `/${name}/create`) {
            return { resource: name, type: 'create' };
        }

        const showMatch = pathname.match(
            new RegExp(`^\/${name}\/(.*?)\/show$`)
        );

        if (showMatch) {
            return { resource: name, type: 'show', resourceId: showMatch[1] };
        }

        const matchEdit = pathname.match(new RegExp(`^\/${name}\/([^\/]*)`));
        if (matchEdit) {
            return { resource: name, type: 'edit', resourceId: matchEdit[1] };
        }
    }

    return null;
};
