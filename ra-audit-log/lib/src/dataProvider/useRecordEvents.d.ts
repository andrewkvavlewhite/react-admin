import { Record } from 'react-admin';
import { EventRecord } from '../types';
declare const useGetListOfEventRecord: (resource: string, pagination?: import("react-admin").PaginationPayload, sort?: import("react-admin").SortPayload, filter?: object, options?: import("react-admin").UseDataProviderOptions) => {
    data: import("react-admin").RecordMap<EventRecord>;
    ids: import("react-admin").Identifier[];
    total?: number;
    error?: any;
    loading: boolean;
    loaded: boolean;
};
/**
 * A hook to fetch the events related to a record.
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from store], ids: [ids from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * @param options The hook options
 * @param options.record Optional. The record for which to fetch the events. Will be inferred from the RecordContext if not provided
 * @param options.resource Optional. The resource of the record. Will be inferred from the ResourceContext if not provided
 * @param options.eventResource Optional. The resource for the events. Defaults to `events`
 * @param options.page Optional. The page of events to fetch. Defaults to 1
 * @param options.perPage Optional. The number of events to fetch. Defaults to 25
 * @param options.sort Optional. The field used to sort the events. Defaults to `date`
 * @param options.order Optional. The order into which to sort the events. Defaults to `DESC`
 * @returns The same object as the `useGetList` hook.
 */
export declare const useRecordEvents: (options?: UseRecordEventsOptions) => ReturnType<typeof useGetListOfEventRecord>;
export interface UseRecordEventsOptions {
    page?: number;
    perPage?: number;
    sort?: string;
    order?: string;
    record?: Record;
    resource?: string;
    eventResource?: string;
}
export {};
