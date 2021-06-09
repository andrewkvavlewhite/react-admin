import { EventRecord } from './types';
/**
 * Returns a translated label for an event.
 * @param options The hook options
 * @param options.record Optional. The event record. Uses the record from the RecordContext if not provided.
 * @param options.variant Optional. Either 'full', 'inline' or 'short'.
 * @param options.pluralizeResource Optional. A boolean indicating whether to pluralize the resource name.
 */
export declare const useEventLabel: (options: UseEventLabelOptions) => string;
export interface UseEventLabelOptions {
    record?: EventRecord;
    pluralizeResource?: boolean;
    variant?: 'full' | 'inline' | 'short';
}
