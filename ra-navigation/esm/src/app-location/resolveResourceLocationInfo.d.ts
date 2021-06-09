export declare type ResourceLocationInfo = {
    type: 'show' | 'create' | 'edit' | 'list';
    resource: string;
    resourceId?: any;
};
export declare type ResourceInfo = {
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
export declare const resolveResourceLocationInfo: (pathname: string, resources: ResourceInfo[]) => ResourceLocationInfo | null;
