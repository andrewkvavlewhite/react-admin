import { ResourceDefinition } from 'react-admin';
import { EventRecord } from './types';
export declare type LinkType = 'edit' | 'show';
export declare type GetActionLink = (record: EventRecord, linkType?: LinkType) => string | undefined;
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
export declare const useGetActionLink: () => GetActionLink;
export declare const getActionLink: (resources: ResourceDefinition[], record: EventRecord, linkType?: LinkType) => string | undefined;
