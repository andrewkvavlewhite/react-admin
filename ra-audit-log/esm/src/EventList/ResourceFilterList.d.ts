import { ReactElement } from 'react';
import { ClassesOverride } from 'react-admin';
/**
 * A react-admin FilterList allowing to filter events by resource. Should be included in a List aside.
 * It excludes the events resource itself which is named `events` by default.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 *
 * @param props The component props
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { ResourceFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <ResourceFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With a custom event resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { ResourceFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <ResourceFilterList eventResource="users" />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export declare const ResourceFilterList: (props: ResourceFilterListProps) => ReactElement;
export interface ResourceFilterListProps {
    eventResource?: string;
    classes?: ClassesOverride<typeof useStyles>;
}
declare const useStyles: (props?: any) => Record<"form" | "input" | "listItem", string>;
export {};
