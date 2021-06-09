import { Translate, GetResourceLabel } from 'react-admin';
import { BreadcrumbPath } from './BreadcrumbItem';
import { ResourceInfo } from '../app-location';
export declare type BreadcrumbPathMap = {
    [key: string]: BreadcrumbPath;
};
/**
 * Builds a map of paths from a resources array
 *
 * @param {array} resources
 * @param {function} translate
 *
 * The output map is of the following form:
 *
 * {
 *  songs: { label: 'Songs', to: '/songs' },
 *  songs.create: { label: 'Create Song', to: '/songs/create' },
 *  songs.show: {
 *    label: ({ record }) => `Show #${record.id}`,
 *    to: ({ record }) => `/${record.id}/show`
 *  }
 *  songs.edit: {
 *    label: ({ record }) => `Edit #${record.id}`,
 *    to: ({ record }) => `/${record.id}/edit`
 *  }
 * }
 */
export declare const buildResourcesBreadcrumbPaths: (resources: ResourceInfo[], translate: Translate, getResourceLabel: GetResourceLabel) => BreadcrumbPathMap;
/**
 * This hook is used internally to build a resource breadcrumb path map
 * The result is usually used by <ResourceBreadcrumbItems /> to render a BreadcrumbItem tree from current resources
 *
 * @see ResourceBreadcrumbItems
 */
export declare const useResourcesBreadcrumbPaths: (selectedResources?: string[]) => BreadcrumbPathMap;
