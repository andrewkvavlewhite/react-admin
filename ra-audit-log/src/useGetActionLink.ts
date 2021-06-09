import { getResources, linkToRecord, ResourceDefinition } from 'react-admin';
import { useSelector } from 'react-redux';
import { EventRecord } from './types';

const DeleteActions = ['delete', 'deleteMany', 'deleteBranch'];
export type LinkType = 'edit' | 'show';

export type GetActionLink = (
    record: EventRecord,
    linkType?: LinkType
) => string | undefined;

/**
 * Returns a function which computes the path for a record targetted by an Event if possible.
 *
 * @returns {GetActionLink} A function which returns the path for a record targetted by an Event or undefined. It accepts the record and an optional link type (either 'edit' or 'show'). If the link type is not provided, it will return a path to the record edit view if possible or show view otherwise. If the Resource has no edit nor show view, the function returns undefined.
 *
 * @example
 * const EventList = (props) => {
 *     const getActionLink = useGetActionLink();
 *
 *     return (
 *         <List {...props}>
 *             <Datagrid rowClick={(id, basePath, record) => getActionLink(record)}>
 *                 ...
 *             </Datagrid>
 *         </List>
 *     );
 */
export const useGetActionLink = (): GetActionLink => {
    const resources = useSelector(getResources);

    return (record: EventRecord, linkType?: LinkType) => {
        return getActionLink(resources, record, linkType);
    };
};

export const getActionLink = (
    resources: ResourceDefinition[],
    record: EventRecord,
    linkType?: LinkType
): string | undefined => {
    const resource = resources.find(r => r.name === record.resource);
    const hasEditOrShow = resource.hasEdit || resource.hasShow;
    const recordId = record.payload.id || record.payload.data?.id;

    const isLinkable =
        record.resource &&
        resource &&
        recordId &&
        !DeleteActions.includes(record.action) &&
        hasEditOrShow;

    if (isLinkable) {
        if (resource) {
            const inferredLinkType = resource.hasEdit ? 'edit' : 'show';
            return linkToRecord(
                `/${record.resource}`,
                recordId,
                linkType || inferredLinkType
            );
        }
    }

    return undefined;
};
