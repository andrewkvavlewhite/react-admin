import { useRecordContext, useTranslate } from 'react-admin';
import { EventRecord } from './types';
import { useGetResourceLabel } from './useGetResourceLabel';

/**
 * Returns a translated label for an event.
 * @param options The hook options
 * @param options.record Optional. The event record. Uses the record from the RecordContext if not provided.
 * @param options.variant Optional. Either 'full', 'inline' or 'short'.
 * @param options.pluralizeResource Optional. A boolean indicating whether to pluralize the resource name.
 */
export const useEventLabel = (options: UseEventLabelOptions): string => {
    const { variant = 'full', pluralizeResource } = options;
    const record = useRecordContext<EventRecord>(options);
    const getResourceLabel = useGetResourceLabel();

    const translate = useTranslate();

    if (!record) {
        return null;
    }

    const pluralize =
        pluralizeResource != undefined
            ? pluralizeResource
            : actionPluralOptions[record.action];

    const { data = {}, ids = [] } = record.payload;
    const name =
        data.name || data.label || data.title || data.reference || data.id;

    const translateOptions = {
        name,
        ids: ids.join(', '),
        resource: getResourceLabel(
            record.resource,
            pluralize ? 2 : 1
        ).toLowerCase(),
    };

    const label = translate(
        `ra-audit-log.${variantTranslationKeys[variant]}.${record.resource}.${record.action}`,
        {
            ...translateOptions,
            // Default generic translation when there is no resource specific translation available
            _: translate(
                `ra-audit-log.${variantTranslationKeys[variant]}.${record.action}`,
                translateOptions
            ),
        }
    );

    return label;
};

const variantTranslationKeys = {
    full: 'event',
    inline: 'inline_event',
    short: 'short_event',
};

const actionPluralOptions = {
    create: false,
    delete: false,
    deleteMany: true,
    update: false,
    updateMany: true,
};

export interface UseEventLabelOptions {
    record?: EventRecord;
    pluralizeResource?: boolean;
    variant?: 'full' | 'inline' | 'short';
}
