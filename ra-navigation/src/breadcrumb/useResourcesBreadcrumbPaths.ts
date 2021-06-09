import {
    Translate,
    linkToRecord,
    getResources,
    useTranslate,
    useGetResourceLabel,
    GetResourceLabel,
    Record,
} from 'react-admin';
import { useSelector, shallowEqual } from 'react-redux';

import { BreadcrumbPath } from './BreadcrumbItem';
import { ResourceInfo } from '../app-location';

export type BreadcrumbPathMap = { [key: string]: BreadcrumbPath };

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
export const buildResourcesBreadcrumbPaths = (
    resources: ResourceInfo[],
    translate: Translate,
    getResourceLabel: GetResourceLabel
): BreadcrumbPathMap =>
    resources.reduce((paths, resource) => {
        const resourcePaths = {};
        const resourceLabelPlural = getResourceLabel(resource.name, 2);
        const resourceLabelSingular = getResourceLabel(resource.name, 1);

        resourcePaths[resource.name] = {
            label: resourceLabelPlural,
            to: `/${resource.name}`,
        };

        resourcePaths[`${resource.name}.create`] = {
            label: !resource.hasList
                ? translate('ra.page.create', {
                      name: resourceLabelSingular,
                  })
                : translate('ra.action.create'),
            to: `/${resource.name}/create`,
        };

        resourcePaths[`${resource.name}.edit`] = {
            label: ({ record }: { record: Record }): string =>
                !record
                    ? translate('ra.action.edit')
                    : !resource.hasList
                    ? translate('ra.page.edit', {
                          name: resourceLabelSingular,
                          id: record.id,
                          record,
                      })
                    : `#${record.id}`,
            to: ({ record }): string =>
                record &&
                `${linkToRecord('/' + resource.name, record.id)}/edit`,
        };

        resourcePaths[`${resource.name}.show`] = {
            label: ({ record }): string =>
                !record
                    ? translate('ra.action.show')
                    : !resource.hasList
                    ? translate('ra.page.show', {
                          name: resourceLabelSingular,
                          id: record.id,
                          record,
                      })
                    : `#${record.id}`,
            to: ({ record }): string =>
                record &&
                `${linkToRecord('/' + resource.name, record.id)}/show`,
        };

        return { ...paths, ...resourcePaths };
    }, {});

/**
 * This hook is used internally to build a resource breadcrumb path map
 * The result is usually used by <ResourceBreadcrumbItems /> to render a BreadcrumbItem tree from current resources
 *
 * @see ResourceBreadcrumbItems
 */
export const useResourcesBreadcrumbPaths = (
    selectedResources?: string[]
): BreadcrumbPathMap => {
    const resources = useSelector(getResources, shallowEqual) as Array<any>;
    const getResourceLabel = useGetResourceLabel();
    const translate = useTranslate();

    return buildResourcesBreadcrumbPaths(
        resources.filter(
            resource =>
                !selectedResources || selectedResources.includes(resource.name)
        ),
        translate,
        getResourceLabel
    );
};
