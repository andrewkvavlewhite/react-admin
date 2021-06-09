import { ReactElement } from 'react';
import { InputProps } from 'react-admin';
/**
 * A react-admin input allowing to filter events by resource. an AutoCompleteInput will be used to select them. It should be included in a List filter.
 * It excludes the events resource itself which is named `events` by default.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filter-buttonform-combo|Filter}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { ResourceInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <ResourceInput
 *                 source="resource"
 *                 // You should specify a label which can be a translation key
 *                 label="Resources"
 *             />
 *         </Filter>
 *     );
 * };
 *
 * @example <caption>With a custom event resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { ResourceInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <ResourceInput
 *                 source="resource"
 *                 // You should specify a label which can be a translation key
 *                 label="Resources"
 *                 eventsResource="aydit-logs"
 *             />
 *         </Filter>
 *     );
 * };
 */
export declare const ResourceInput: (props: ResourceInputProps) => ReactElement;
export interface ResourceInputProps extends Omit<InputProps, 'source'> {
    eventResource?: string;
    label?: string;
    onChange?: (event: any) => void;
    source?: string;
}
