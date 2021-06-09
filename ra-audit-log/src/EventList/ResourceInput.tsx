import * as React from 'react';
import { ReactElement } from 'react';
import inflection from 'inflection';

import { useSelector } from 'react-redux';
import {
    AutocompleteInput,
    getResources,
    InputProps,
    useTranslate,
} from 'react-admin';
import { DefaultAuditLogResource } from '../constants';

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
export const ResourceInput = (props: ResourceInputProps): ReactElement => {
    const { eventResource = DefaultAuditLogResource, source, ...rest } = props;
    const resources = useSelector(getResources);
    const translate = useTranslate();

    const choices = resources
        .filter(({ name }) => name !== eventResource)
        .map(({ name, options }) => ({
            id: name,
            name: translate(`resources.${name}.name`, {
                smart_count: 2,
                _: options?.label
                    ? translate(options.label, {
                          smart_count: 2,
                          _: options.label,
                      })
                    : inflection.humanize(inflection.pluralize(name)),
            }),
        }));

    return (
        <AutocompleteInput
            source="resource"
            choices={choices}
            resettable
            {...rest}
        />
    );
};

export interface ResourceInputProps extends Omit<InputProps, 'source'> {
    eventResource?: string;
    label?: string;
    onChange?: (event: any) => void;
    source?: string;
}
