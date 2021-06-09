import { ReactElement } from 'react';
import { ClassesOverride } from 'react-admin';
/**
 * A react-admin FilterList allowing to filter events by author. Should be included in a List aside.
 * If the events authors have a dedicated resource, an AutoCompleteInput will be used to select them.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { AuthorFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <AuthorFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With an author resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { AuthorFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <AuthorFilterList authorResource="users" />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export declare const AuthorFilterList: (props: AuthorFilterListProps) => ReactElement;
export interface AuthorFilterListProps {
    authorResource?: string;
    classes?: ClassesOverride<typeof useStyles>;
}
declare const useStyles: (props?: any) => Record<"form" | "input" | "listItem", string>;
export {};
